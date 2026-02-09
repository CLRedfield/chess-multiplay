/**
 * 房间管理模块 - Firebase 多人联机
 * 负责房间创建、加入、同步等功能
 */

const RoomManager = (function () {
    // 私有变量
    let currentRoom = null;
    let currentUser = null;
    let roomRef = null;
    let unsubscribers = [];

    // 生成6位随机房间码
    function generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // 生成唯一玩家ID
    function generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 创建房间
     * @param {string} username - 用户名
     * @param {object} config - 游戏配置 { mode, boardSize }
     * @returns {Promise<string>} - 房间码
     */
    async function createRoom(username, config) {
        const roomCode = generateRoomCode();
        const playerId = generatePlayerId();

        currentUser = {
            id: playerId,
            name: username,
            isHost: true
        };

        const roomData = {
            host: playerId,
            hostName: username,
            config: config,
            status: 'waiting', // waiting, playing, finished
            players: {
                [playerId]: {
                    name: username,
                    ready: true,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            playerOrder: [playerId],
            identities: null, // 游戏开始时分配
            gameState: null,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };

        roomRef = database.ref('rooms/' + roomCode);
        await roomRef.set(roomData);

        currentRoom = {
            code: roomCode,
            ...roomData
        };

        // 设置断开连接时的清理
        setupDisconnectHandler(roomCode, playerId, true);

        return roomCode;
    }

    /**
     * 加入房间
     * @param {string} roomCode - 房间码
     * @param {string} username - 用户名
     * @returns {Promise<object>} - 房间数据
     */
    async function joinRoom(roomCode, username) {
        roomRef = database.ref('rooms/' + roomCode);

        const snapshot = await roomRef.once('value');
        if (!snapshot.exists()) {
            throw new Error('房间不存在');
        }

        const roomData = snapshot.val();

        if (roomData.status !== 'waiting') {
            throw new Error('游戏已经开始，无法加入');
        }

        const playerCount = Object.keys(roomData.players || {}).length;
        if (playerCount >= 8) {
            throw new Error('房间已满（最多8人）');
        }

        const playerId = generatePlayerId();
        currentUser = {
            id: playerId,
            name: username,
            isHost: false
        };

        // 添加玩家
        await roomRef.child('players/' + playerId).set({
            name: username,
            ready: true,
            joinedAt: firebase.database.ServerValue.TIMESTAMP
        });

        // 更新玩家顺序
        const newOrder = [...(roomData.playerOrder || []), playerId];
        await roomRef.child('playerOrder').set(newOrder);

        currentRoom = {
            code: roomCode,
            ...roomData
        };

        setupDisconnectHandler(roomCode, playerId, false);

        return currentRoom;
    }

    /**
     * 设置断开连接处理
     */
    function setupDisconnectHandler(roomCode, playerId, isHost) {
        const playerRef = database.ref('rooms/' + roomCode + '/players/' + playerId);

        if (isHost) {
            // 房主离开时删除整个房间
            database.ref('rooms/' + roomCode).onDisconnect().remove();
        } else {
            // 普通玩家离开时只删除自己
            playerRef.onDisconnect().remove();
        }
    }

    /**
     * 离开房间
     */
    async function leaveRoom() {
        if (!currentRoom || !currentUser) return;

        // 取消所有监听
        unsubscribers.forEach(unsub => unsub());
        unsubscribers = [];

        if (currentUser.isHost) {
            // 房主离开，删除房间
            await roomRef.remove();
        } else {
            // 普通玩家离开
            await roomRef.child('players/' + currentUser.id).remove();

            // 从玩家顺序中移除
            const snapshot = await roomRef.child('playerOrder').once('value');
            const order = snapshot.val() || [];
            const newOrder = order.filter(id => id !== currentUser.id);
            await roomRef.child('playerOrder').set(newOrder);
        }

        currentRoom = null;
        currentUser = null;
        roomRef = null;
    }

    /**
     * 开始游戏（仅房主可用）
     * @param {Array} identities - 身份数组
     */
    async function startGame(identities) {
        if (!currentUser.isHost) {
            throw new Error('只有房主可以开始游戏');
        }

        const snapshot = await roomRef.child('players').once('value');
        const players = snapshot.val();
        const playerCount = Object.keys(players).length;

        if (playerCount < 5) {
            throw new Error('至少需要5名玩家才能开始');
        }
        if (playerCount > 8) {
            throw new Error('最多8名玩家');
        }

        // 获取玩家顺序
        const orderSnapshot = await roomRef.child('playerOrder').once('value');
        const playerOrder = orderSnapshot.val() || Object.keys(players);

        // 洗牌身份
        const shuffledIdentities = [...identities];
        for (let i = shuffledIdentities.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledIdentities[i], shuffledIdentities[j]] = [shuffledIdentities[j], shuffledIdentities[i]];
        }

        // 分配身份
        const identityMap = {};
        playerOrder.forEach((playerId, index) => {
            identityMap[playerId] = shuffledIdentities[index];
        });

        await roomRef.update({
            status: 'playing',
            identities: identityMap,
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
    }

    /**
     * 同步游戏状态
     * @param {object} state - 游戏状态
     */
    async function syncGameState(state) {
        if (!roomRef) return;
        await roomRef.child('gameState').set(state);
    }

    /**
     * 监听房间变化
     * @param {function} callback - 回调函数
     */
    function onRoomChange(callback) {
        if (!roomRef) return;

        const unsub = roomRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                // 更新内部状态
                if (currentRoom) {
                    currentRoom = {
                        ...currentRoom,
                        ...val
                    };
                }
                callback(val);
            } else {
                callback(null);
            }
        });

        unsubscribers.push(() => roomRef.off('value', unsub));
    }

    /**
     * 监听游戏状态变化
     * @param {function} callback - 回调函数
     */
    function onGameStateChange(callback) {
        if (!roomRef) return;

        const stateRef = roomRef.child('gameState');
        const unsub = stateRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            }
        });

        unsubscribers.push(() => stateRef.off('value', unsub));
    }

    /**
     * 获取当前用户信息
     */
    function getCurrentUser() {
        return currentUser;
    }

    /**
     * 获取当前房间信息
     */
    function getCurrentRoom() {
        return currentRoom;
    }

    /**
     * 获取我的身份
     */
    async function getMyIdentity() {
        if (!roomRef || !currentUser) return null;

        const snapshot = await roomRef.child('identities/' + currentUser.id).once('value');
        return snapshot.val();
    }

    /**
     * 检查是否是我的回合
     * @param {number} currentPlayerIndex - 当前玩家索引
     * @param {Array} alivePlayers - 存活玩家列表（玩家索引）
     * @param {Array} playerOrder - 玩家顺序（玩家ID列表）
     */
    function isMyTurn(currentPlayerIndex, alivePlayers, playerOrder) {
        if (!currentUser || !playerOrder) return false;

        const myIndex = playerOrder.indexOf(currentUser.id);
        const currentPlayerId = playerOrder[alivePlayers[currentPlayerIndex]];

        return currentUser.id === currentPlayerId;
    }

    // 公共API
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
