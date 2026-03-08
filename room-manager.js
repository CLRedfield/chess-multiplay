/**
 * 房间管理模块 - Firebase 多人联机
 * 负责房间创建、加入、同步等功能
 */

const RoomManager = (function () {
    let currentRoom = null;
    let currentUser = null;
    let roomRef = null;
    let unsubscribers = [];

    function generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function generatePlayerId() {
        return `player_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }

    function getPlayerLimits(config = {}) {
        if (config.minPlayers && config.maxPlayers) {
            return {
                min: config.minPlayers,
                max: config.maxPlayers
            };
        }

        if (config.is2v2) {
            return { min: 4, max: 4 };
        }

        return { min: 5, max: 8 };
    }

    function sanitizePlayerOrder(players = {}, playerOrder = []) {
        const existingIds = Object.keys(players);
        const existingSet = new Set(existingIds);
        const sanitized = (playerOrder || []).filter(playerId => existingSet.has(playerId));

        existingIds.forEach(playerId => {
            if (!sanitized.includes(playerId)) {
                sanitized.push(playerId);
            }
        });

        return sanitized;
    }

    function normalizeRoomConfig(config = {}) {
        const limits = getPlayerLimits(config);
        return {
            ...config,
            minPlayers: limits.min,
            maxPlayers: limits.max
        };
    }

    function clearListeners() {
        unsubscribers.forEach(unsubscribe => unsubscribe());
        unsubscribers = [];
    }

    async function cancelDisconnectHandlers() {
        if (!currentRoom || !currentUser) {
            return;
        }

        const roomPath = `rooms/${currentRoom.code}`;
        await database.ref(roomPath).onDisconnect().cancel();
        await database.ref(`${roomPath}/players/${currentUser.id}`).onDisconnect().cancel();
    }

    async function createRoom(username, config) {
        const roomCode = generateRoomCode();
        const playerId = generatePlayerId();
        const normalizedConfig = normalizeRoomConfig(config);

        currentUser = {
            id: playerId,
            name: username,
            isHost: true
        };

        const roomData = {
            host: playerId,
            hostName: username,
            config: normalizedConfig,
            status: 'waiting',
            players: {
                [playerId]: {
                    name: username,
                    ready: true,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            playerOrder: [playerId],
            identities: null,
            gameState: null,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };

        roomRef = database.ref(`rooms/${roomCode}`);
        await roomRef.set(roomData);

        currentRoom = {
            code: roomCode,
            ...roomData
        };

        setupDisconnectHandler(roomCode, playerId, true);
        return roomCode;
    }

    async function joinRoom(roomCode, username) {
        roomRef = database.ref(`rooms/${roomCode}`);

        const snapshot = await roomRef.once('value');
        if (!snapshot.exists()) {
            throw new Error('房间不存在');
        }

        const roomData = snapshot.val();
        if (roomData.status !== 'waiting') {
            throw new Error('游戏已经开始，无法加入');
        }

        const normalizedConfig = normalizeRoomConfig(roomData.config || {});
        const limits = getPlayerLimits(normalizedConfig);
        const currentPlayers = roomData.players || {};
        const currentOrder = sanitizePlayerOrder(currentPlayers, roomData.playerOrder);

        if (currentOrder.length >= limits.max) {
            throw new Error(`房间已满（最多${limits.max}人）`);
        }

        const playerId = generatePlayerId();
        currentUser = {
            id: playerId,
            name: username,
            isHost: false
        };

        await roomRef.child(`players/${playerId}`).set({
            name: username,
            ready: true,
            joinedAt: firebase.database.ServerValue.TIMESTAMP
        });

        const newOrder = [...currentOrder, playerId];
        await roomRef.child('playerOrder').set(newOrder);

        currentRoom = {
            code: roomCode,
            ...roomData,
            config: normalizedConfig,
            players: {
                ...currentPlayers,
                [playerId]: {
                    name: username,
                    ready: true
                }
            },
            playerOrder: newOrder
        };

        setupDisconnectHandler(roomCode, playerId, false);
        return currentRoom;
    }

    function setupDisconnectHandler(roomCode, playerId, isHost) {
        const roomPath = `rooms/${roomCode}`;
        const playerRef = database.ref(`${roomPath}/players/${playerId}`);

        if (isHost) {
            database.ref(roomPath).onDisconnect().remove();
            return;
        }

        playerRef.onDisconnect().remove();
    }

    async function leaveRoom() {
        if (!currentRoom || !currentUser || !roomRef) {
            return;
        }

        clearListeners();
        await cancelDisconnectHandlers();

        if (currentUser.isHost) {
            await roomRef.remove();
        } else {
            await roomRef.child(`players/${currentUser.id}`).remove();

            const snapshot = await roomRef.once('value');
            if (snapshot.exists()) {
                const roomData = snapshot.val();
                const newOrder = sanitizePlayerOrder(roomData.players || {}, roomData.playerOrder);
                await roomRef.child('playerOrder').set(newOrder);
            }
        }

        currentRoom = null;
        currentUser = null;
        roomRef = null;
    }

    async function startGame(identities = []) {
        if (!currentUser || !currentUser.isHost) {
            throw new Error('只有房主可以开始游戏');
        }

        const snapshot = await roomRef.once('value');
        if (!snapshot.exists()) {
            throw new Error('房间不存在');
        }

        const roomData = snapshot.val();
        const config = normalizeRoomConfig(roomData.config || {});
        const players = roomData.players || {};
        const playerOrder = sanitizePlayerOrder(players, roomData.playerOrder);
        const limits = getPlayerLimits(config);
        const playerCount = playerOrder.length;

        if (playerCount < limits.min) {
            throw new Error(`至少需要${limits.min}名玩家才能开始`);
        }
        if (playerCount > limits.max) {
            throw new Error(`最多${limits.max}名玩家`);
        }

        let identityMap = null;
        if (Array.isArray(identities) && identities.length > 0) {
            const shuffled = [...identities];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            if (config.identityMode === 'chaos') {
                const lordIndex = shuffled.indexOf('主公');
                if (lordIndex !== -1 && lordIndex !== 0) {
                    [shuffled[0], shuffled[lordIndex]] = [shuffled[lordIndex], shuffled[0]];
                    [playerOrder[0], playerOrder[lordIndex]] = [playerOrder[lordIndex], playerOrder[0]];
                }
            }

            identityMap = {};
            playerOrder.forEach((playerId, index) => {
                identityMap[playerId] = shuffled[index] ?? null;
            });
        }

        await roomRef.update({
            status: 'playing',
            config,
            identities: identityMap,
            playerOrder,
            gameState: null,
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
    }

    async function syncGameState(state) {
        if (!roomRef) {
            return;
        }
        await roomRef.child('gameState').set(state);
    }

    function onRoomChange(callback) {
        if (!roomRef) {
            return;
        }

        const listener = roomRef.on('value', snapshot => {
            if (!snapshot.exists()) {
                callback(null);
                return;
            }

            const value = snapshot.val();
            const normalizedConfig = normalizeRoomConfig(value.config || {});
            const normalizedOrder = sanitizePlayerOrder(value.players || {}, value.playerOrder);

            if (
                currentUser &&
                currentUser.isHost &&
                value.status === 'waiting' &&
                JSON.stringify(normalizedOrder) !== JSON.stringify(value.playerOrder || [])
            ) {
                roomRef.child('playerOrder').set(normalizedOrder);
            }

            currentRoom = {
                ...(currentRoom || {}),
                code: currentRoom?.code || roomRef.key,
                ...value,
                config: normalizedConfig,
                playerOrder: normalizedOrder
            };

            callback(currentRoom);
        });

        unsubscribers.push(() => roomRef.off('value', listener));
    }

    function onGameStateChange(callback) {
        if (!roomRef) {
            return;
        }

        const stateRef = roomRef.child('gameState');
        const listener = stateRef.on('value', snapshot => {
            callback(snapshot.exists() ? snapshot.val() : null);
        });

        unsubscribers.push(() => stateRef.off('value', listener));
    }

    function getCurrentUser() {
        return currentUser;
    }

    function getCurrentRoom() {
        return currentRoom;
    }

    async function getMyIdentity() {
        if (!roomRef || !currentUser) {
            return null;
        }

        const snapshot = await roomRef.child(`identities/${currentUser.id}`).once('value');
        return snapshot.exists() ? snapshot.val() : null;
    }

    function isMyTurn(currentPlayerIndex, alivePlayers, playerOrder) {
        if (!currentUser || !Array.isArray(alivePlayers) || !Array.isArray(playerOrder)) {
            return false;
        }

        const mySeatIndex = playerOrder.indexOf(currentUser.id);
        const activeSeatIndex = alivePlayers[currentPlayerIndex];
        return mySeatIndex !== -1 && activeSeatIndex === mySeatIndex;
    }

    return {
        createRoom,
        joinRoom,
        leaveRoom,
        startGame,
        syncGameState,
        onRoomChange,
        onGameStateChange,
        getCurrentUser,
        getCurrentRoom,
        getMyIdentity,
        isMyTurn
    };
})();
