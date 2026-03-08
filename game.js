const GAME_MODE_CATALOG = {
    chaos_chinese_16: {
        id: 'chaos_chinese_16',
        label: '中国16×16大乱斗',
        shortLabel: '中国16×16',
        category: 'chaos',
        ruleset: 'chaos-chinese',
        boardCols: 16,
        boardRows: 16,
        minPlayers: 5,
        maxPlayers: 8,
        identityMode: 'chaos',
        localSupportsAI: false
    },
    chaos_chinese_10: {
        id: 'chaos_chinese_10',
        label: '中国10×10大乱斗',
        shortLabel: '中国10×10',
        category: 'chaos',
        ruleset: 'chaos-chinese',
        boardCols: 10,
        boardRows: 10,
        minPlayers: 5,
        maxPlayers: 8,
        identityMode: 'chaos',
        localSupportsAI: false
    },
    chaos_western_16: {
        id: 'chaos_western_16',
        label: '国际16×16大乱斗',
        shortLabel: '国际16×16',
        category: 'chaos',
        ruleset: 'chaos-western',
        boardCols: 16,
        boardRows: 16,
        minPlayers: 5,
        maxPlayers: 8,
        identityMode: 'chaos',
        localSupportsAI: false
    },
    chaos_western_10: {
        id: 'chaos_western_10',
        label: '国际10×10大乱斗',
        shortLabel: '国际10×10',
        category: 'chaos',
        ruleset: 'chaos-western',
        boardCols: 10,
        boardRows: 10,
        minPlayers: 5,
        maxPlayers: 8,
        identityMode: 'chaos',
        localSupportsAI: false
    },
    team_chinese_12: {
        id: 'team_chinese_12',
        label: '中国象棋 2v2',
        shortLabel: '中国2v2',
        category: 'team',
        ruleset: 'chaos-chinese',
        boardCols: 12,
        boardRows: 12,
        minPlayers: 4,
        maxPlayers: 4,
        identityMode: 'team',
        is2v2: true,
        localSupportsAI: false
    },
    team_western_12: {
        id: 'team_western_12',
        label: '国际象棋 2v2',
        shortLabel: '国际2v2',
        category: 'team',
        ruleset: 'chaos-western',
        boardCols: 12,
        boardRows: 12,
        minPlayers: 4,
        maxPlayers: 4,
        identityMode: 'team',
        is2v2: true,
        localSupportsAI: false
    },
    duel_xiangqi: {
        id: 'duel_xiangqi',
        label: '双人象棋',
        shortLabel: '双人象棋',
        category: 'duel',
        ruleset: 'xiangqi',
        boardCols: 9,
        boardRows: 10,
        minPlayers: 2,
        maxPlayers: 2,
        identityMode: null,
        localSupportsAI: true
    },
    duel_chess: {
        id: 'duel_chess',
        label: '双人国际象棋',
        shortLabel: '双人国际象棋',
        category: 'duel',
        ruleset: 'chess',
        boardCols: 8,
        boardRows: 8,
        minPlayers: 2,
        maxPlayers: 2,
        identityMode: null,
        localSupportsAI: true
    },
    duel_dark: {
        id: 'duel_dark',
        label: '双人中国象棋揭棋',
        shortLabel: '双人揭棋',
        category: 'duel',
        ruleset: 'dark-chess',
        boardCols: 8,
        boardRows: 4,
        minPlayers: 2,
        maxPlayers: 2,
        identityMode: null,
        localSupportsAI: true
    }
};

const CHAOS_PLAYERS = [
    { id: 0, name: '主公', color: '#e74c3c', isLord: true },
    { id: 1, name: '诸侯A', color: '#e67e22', isLord: false },
    { id: 2, name: '诸侯B', color: '#f1c40f', isLord: false },
    { id: 3, name: '诸侯C', color: '#2ecc71', isLord: false },
    { id: 4, name: '诸侯D', color: '#00bcd4', isLord: false },
    { id: 5, name: '诸侯E', color: '#3498db', isLord: false },
    { id: 6, name: '诸侯F', color: '#9b59b6', isLord: false },
    { id: 7, name: '诸侯G', color: '#34495e', isLord: false }
];

const TEAM_PLAYERS = [
    { id: 0, name: '红队·左', color: '#dc2626', team: 0 },
    { id: 1, name: '蓝队·左', color: '#2563eb', team: 1 },
    { id: 2, name: '蓝队·右', color: '#0f766e', team: 1 },
    { id: 3, name: '红队·右', color: '#ea580c', team: 0 }
];

const DUEL_XIANGQI_PLAYERS = [
    { id: 0, name: '红方', color: '#dc2626', side: 'red' },
    { id: 1, name: '黑方', color: '#111827', side: 'black' }
];

const DUEL_CHESS_PLAYERS = [
    { id: 0, name: '白方', color: '#2563eb', side: 'white' },
    { id: 1, name: '黑方', color: '#111827', side: 'black' }
];

const AI_DIFFICULTY_LABELS = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
};

const AI_PROFILES = {
    easy: { depth: 1, topCandidates: 5, randomPool: 4, randomChance: 0.7 },
    medium: { depth: 1, topCandidates: 8, randomPool: 3, randomChance: 0.15 },
    hard: { depth: 2, topCandidates: 10, randomPool: 1, randomChance: 0 }
};

const CHINESE_LABELS = {
    general: '将',
    advisor: '士',
    elephant: '象',
    horse: '马',
    chariot: '车',
    cannon: '炮',
    soldier: '兵'
};

const XIANGQI_LABELS = {
    red: {
        general: '帅',
        advisor: '仕',
        elephant: '相',
        horse: '马',
        chariot: '车',
        cannon: '炮',
        soldier: '兵'
    },
    black: {
        general: '将',
        advisor: '士',
        elephant: '象',
        horse: '马',
        chariot: '车',
        cannon: '炮',
        soldier: '卒'
    }
};

const CHAOS_WESTERN_SYMBOLS = {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
};

const CHESS_SYMBOLS = {
    white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
    },
    black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
    }
};

const DARK_RANKS = {
    general: 7,
    advisor: 6,
    elephant: 5,
    chariot: 4,
    horse: 3,
    cannon: 2,
    soldier: 1
};

window.GAME_MODE_CATALOG = GAME_MODE_CATALOG;
window.getModeMeta = getModeMeta;
window.normalizeGameConfig = normalizeGameConfig;

let gameState = createBaseGameState();
let moveHistory = [];
let aiTimerId = null;
let onlineStateListenerReady = false;

function createBaseGameState() {
    const modeMeta = GAME_MODE_CATALOG.chaos_chinese_16;
    return {
        modeId: modeMeta.id,
        modeMeta,
        pieces: [],
        currentPlayerIndex: 0,
        selectedPieceId: null,
        alivePlayers: [],
        totalPlayers: 5,
        isOnline: false,
        mySeatIndex: null,
        playerOrder: null,
        boardCols: modeMeta.boardCols,
        boardRows: modeMeta.boardRows,
        gameOver: false,
        winnerText: '',
        winnerSeat: null,
        resultType: null,
        modeState: {},
        ai: {
            enabled: false,
            difficulty: 'easy',
            playerIndex: 1,
            thinking: false
        }
    };
}

function getModeMeta(modeId) {
    return GAME_MODE_CATALOG[modeId] || GAME_MODE_CATALOG.chaos_chinese_16;
}

function deriveLegacyModeId(config = {}) {
    if (config.modeId && GAME_MODE_CATALOG[config.modeId]) {
        return config.modeId;
    }

    if (config.is2v2) {
        return config.mode === 'western' ? 'team_western_12' : 'team_chinese_12';
    }

    if (config.mode === 'western' && config.boardSize === 16) {
        return 'chaos_western_16';
    }
    if (config.mode === 'western' && config.boardSize === 10) {
        return 'chaos_western_10';
    }
    if (config.mode === 'chinese' && config.boardSize === 10) {
        return 'chaos_chinese_10';
    }

    return 'chaos_chinese_16';
}

function normalizeGameConfig(config = {}) {
    const modeId = deriveLegacyModeId(config);
    const modeMeta = getModeMeta(modeId);

    return {
        ...modeMeta,
        ...config,
        modeId: modeMeta.id,
        label: config.label || modeMeta.label,
        shortLabel: config.shortLabel || modeMeta.shortLabel,
        category: config.category || modeMeta.category,
        ruleset: config.ruleset || modeMeta.ruleset,
        boardCols: config.boardCols || modeMeta.boardCols,
        boardRows: config.boardRows || modeMeta.boardRows,
        boardSize: config.boardSize || modeMeta.boardCols,
        minPlayers: config.minPlayers || modeMeta.minPlayers,
        maxPlayers: config.maxPlayers || modeMeta.maxPlayers,
        identityMode: config.identityMode ?? modeMeta.identityMode,
        is2v2: Boolean(config.is2v2 ?? modeMeta.is2v2),
        localSupportsAI: Boolean(modeMeta.localSupportsAI)
    };
}

function createInitialModeState(modeMeta) {
    if (modeMeta.id === 'duel_chess') {
        return {
            castlingRights: {
                0: { kingSide: true, queenSide: true },
                1: { kingSide: true, queenSide: true }
            },
            enPassant: null
        };
    }
    if (modeMeta.id === 'duel_dark') {
        return {
            darkSideByPlayer: [null, null]
        };
    }
    return {};
}

function createPiece(fields) {
    return {
        id: `piece_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`,
        ...fields
    };
}

function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
}

function cloneState(state) {
    const nextState = cloneData(state);
    nextState.modeMeta = getModeMeta(nextState.modeId);
    nextState.ai = nextState.ai || {
        enabled: false,
        difficulty: 'easy',
        playerIndex: 1,
        thinking: false
    };
    return nextState;
}

function clearAiTimer() {
    if (aiTimerId) {
        clearTimeout(aiTimerId);
        aiTimerId = null;
    }
}

function teardownCurrentGame() {
    clearAiTimer();
    onlineStateListenerReady = false;
}

window.teardownCurrentGame = teardownCurrentGame;

function startGame() {
    const selectedCard = document.querySelector('.mode-card.selected');
    const modeConfig = normalizeGameConfig({ modeId: selectedCard.dataset.modeId });
    const aiEnabled = modeConfig.category === 'duel'
        && document.querySelector('.duel-player-option.selected')?.dataset.versus === 'ai';
    const aiDifficulty = document.querySelector('.ai-difficulty-option.selected')?.dataset.difficulty || 'easy';
    const totalPlayers = modeConfig.category === 'chaos'
        ? parseInt(document.getElementById('player-count').value, 10)
        : modeConfig.maxPlayers;

    teardownCurrentGame();
    moveHistory = [];

    gameState = createBaseGameState();
    gameState.modeId = modeConfig.modeId;
    gameState.modeMeta = modeConfig;
    gameState.totalPlayers = totalPlayers;
    gameState.boardCols = modeConfig.boardCols;
    gameState.boardRows = modeConfig.boardRows;
    gameState.isOnline = false;
    gameState.modeState = createInitialModeState(modeConfig);
    gameState.ai = {
        enabled: aiEnabled,
        difficulty: aiDifficulty,
        playerIndex: 1,
        thinking: false
    };

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'flex';
    document.getElementById('undo-btn').style.display = 'inline-block';

    initBoard();
    maybeScheduleAiTurn();
}

function initOnlineGame(config, playerCount, mySeatIndex, playerOrder) {
    const modeConfig = normalizeGameConfig(config);

    teardownCurrentGame();
    moveHistory = [];

    gameState = createBaseGameState();
    gameState.modeId = modeConfig.modeId;
    gameState.modeMeta = modeConfig;
    gameState.totalPlayers = playerCount;
    gameState.boardCols = modeConfig.boardCols;
    gameState.boardRows = modeConfig.boardRows;
    gameState.isOnline = true;
    gameState.mySeatIndex = mySeatIndex;
    gameState.playerOrder = playerOrder;
    gameState.modeState = createInitialModeState(modeConfig);
    gameState.ai = {
        enabled: false,
        difficulty: 'easy',
        playerIndex: 1,
        thinking: false
    };

    document.getElementById('undo-btn').style.display = 'none';

    initBoard();
    setupOnlineGameListeners();
}

function setupOnlineGameListeners() {
    if (onlineStateListenerReady) {
        return;
    }

    onlineStateListenerReady = true;
    RoomManager.onGameStateChange(state => {
        if (!state) {
            return;
        }

        const wasGameOver = gameState.gameOver;
        gameState.pieces = state.pieces || [];
        gameState.currentPlayerIndex = state.currentPlayerIndex ?? 0;
        gameState.alivePlayers = state.alivePlayers || [];
        gameState.selectedPieceId = null;
        gameState.gameOver = Boolean(state.gameOver);
        gameState.winnerText = state.winnerText || '';
        gameState.winnerSeat = state.winnerSeat ?? null;
        gameState.resultType = state.resultType || null;
        gameState.modeState = state.modeState || createInitialModeState(gameState.modeMeta);
        clearHints();
        renderPieces();
        updateStatus();

        if (!wasGameOver && gameState.gameOver && gameState.winnerText) {
            setTimeout(() => alert(gameState.winnerText), 100);
        }
    });
}

function prepareBoardGeometry() {
    const grid = document.getElementById('grid');
    grid.className = `grid-layer grid-${gameState.boardCols}x${gameState.boardRows}`;
    grid.innerHTML = '';

    for (let i = 0; i < gameState.boardCols * gameState.boardRows; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }

    document.documentElement.style.setProperty('--board-cols', String(gameState.boardCols));
}

function initBoard() {
    prepareBoardGeometry();
    clearHints();
    gameState.selectedPieceId = null;
    gameState.gameOver = false;
    gameState.winnerText = '';
    gameState.winnerSeat = null;
    gameState.resultType = null;

    const currentUser = gameState.isOnline ? RoomManager.getCurrentUser() : null;
    if (gameState.isOnline && currentUser && !currentUser.isHost) {
        gameState.pieces = [];
        gameState.alivePlayers = buildInitialAlivePlayers(gameState);
        renderPieces();
        updateStatus('等待房主同步棋局...');
        return;
    }

    spawnInitialPieces(gameState);
    renderPieces();
    updateStatus();
    syncCurrentStateIfNeeded();
}

function buildInitialAlivePlayers(state) {
    const count = state.modeMeta.category === 'chaos'
        ? state.totalPlayers
        : state.modeMeta.maxPlayers;
    return Array.from({ length: count }, (_, index) => index);
}

function spawnInitialPieces(state) {
    state.pieces = [];

    if (state.modeMeta.category === 'chaos') {
        spawnChaosPieces(state);
    } else if (state.modeMeta.category === 'team') {
        spawnTeamPieces(state);
    } else if (state.modeMeta.id === 'duel_xiangqi') {
        spawnDuelXiangqi(state);
    } else if (state.modeMeta.id === 'duel_chess') {
        spawnDuelChess(state);
    } else if (state.modeMeta.id === 'duel_dark') {
        spawnDuelDark(state);
    }

    state.alivePlayers = buildInitialAlivePlayers(state);
    state.currentPlayerIndex = 0;
}

function spawnChaosPieces(state) {
    const size = state.boardCols;
    const mid = Math.floor(size / 2);
    const slots = [
        { id: 0, type: 'cardinal', kx: mid - 1, ky: 0, dx: 0, dy: 1, rx: -1, ry: 0 },
        { id: 1, type: 'corner', kx: 0, ky: 0, dx: 1, dy: 1 },
        { id: 2, type: 'cardinal', kx: 0, ky: mid - 1, dx: 1, dy: 0, rx: 0, ry: 1 },
        { id: 3, type: 'corner', kx: 0, ky: size - 1, dx: 1, dy: -1 },
        { id: 4, type: 'cardinal', kx: mid, ky: size - 1, dx: 0, dy: -1, rx: 1, ry: 0 },
        { id: 5, type: 'corner', kx: size - 1, ky: size - 1, dx: -1, dy: -1 },
        { id: 6, type: 'cardinal', kx: size - 1, ky: mid, dx: -1, dy: 0, rx: 0, ry: -1 },
        { id: 7, type: 'corner', kx: size - 1, ky: 0, dx: -1, dy: 1 }
    ];

    const chosenByCount = {
        5: [0, 2, 4, 6, 7],
        6: [0, 2, 3, 4, 6, 7],
        7: [0, 1, 2, 3, 4, 6, 7],
        8: [0, 1, 2, 3, 4, 5, 6, 7]
    };

    (chosenByCount[state.totalPlayers] || chosenByCount[5]).forEach((slotIndex, playerIndex) => {
        createChaosFormation(state, slots[slotIndex], playerIndex);
    });
}

function createChaosFormation(state, cfg, owner) {
    const isWestern = state.modeMeta.ruleset === 'chaos-western';
    const isSmall = state.boardCols === 10;
    const isLord = CHAOS_PLAYERS[owner]?.isLord;
    const add = (type, x, y) => {
        if (isInsideBoard(state, x, y)) {
            state.pieces.push(createPiece({ owner, type, x, y }));
        }
    };

    if (isWestern && isSmall) {
        createChaosWesternSmall(state, cfg, add, isLord);
    } else if (isWestern) {
        createChaosWesternBig(state, cfg, add, isLord);
    } else if (isSmall) {
        createChaosChineseSmall(state, cfg, add, isLord);
    } else {
        createChaosChineseBig(state, cfg, add, isLord);
    }
}

function createChaosChineseBig(state, cfg, add, isLord) {
    if (cfg.type === 'corner') {
        add('general', cfg.kx, cfg.ky);
        add('advisor', cfg.kx + cfg.dx, cfg.ky);
        add('advisor', cfg.kx, cfg.ky + cfg.dy);
        add('chariot', cfg.kx + 2 * cfg.dx, cfg.ky);
        add('chariot', cfg.kx, cfg.ky + 2 * cfg.dy);
        add('horse', cfg.kx + cfg.dx, cfg.ky + cfg.dy);
        add('cannon', cfg.kx + 2 * cfg.dx, cfg.ky + 2 * cfg.dy);
        return;
    }

    const forward = step => ({ x: step * cfg.dx, y: step * cfg.dy });
    const right = step => ({ x: step * cfg.rx, y: step * cfg.ry });
    const put = (type, forwardSteps, rightSteps) => {
        const f = forward(forwardSteps);
        const r = right(rightSteps);
        add(type, cfg.kx + f.x + r.x, cfg.ky + f.y + r.y);
    };

    put('general', 0, 0);
    if (isLord) {
        put('advisor', 0, -1);
        put('advisor', 0, 1);
        put('horse', 0, -2);
        put('horse', 0, 2);
        put('chariot', 0, -3);
        put('chariot', 0, 3);
        put('chariot', 1, 2);
        put('chariot', 1, -2);
        put('cannon', 2, -2);
        put('cannon', 2, 2);
        put('advisor', 1, 0);
    } else {
        put('advisor', 0, -1);
        put('advisor', 0, 1);
        put('chariot', 0, -2);
        put('chariot', 0, 2);
        put('horse', 1, -1);
        put('cannon', 1, 1);
    }
}

function createChaosChineseSmall(state, cfg, add, isLord) {
    if (cfg.type === 'corner') {
        add('general', cfg.kx, cfg.ky);
        add('chariot', cfg.kx + cfg.dx, cfg.ky);
        add('chariot', cfg.kx, cfg.ky + cfg.dy);
        add('horse', cfg.kx + cfg.dx, cfg.ky + cfg.dy);
        return;
    }

    const forward = step => ({ x: step * cfg.dx, y: step * cfg.dy });
    const right = step => ({ x: step * cfg.rx, y: step * cfg.ry });
    const put = (type, forwardSteps, rightSteps) => {
        const f = forward(forwardSteps);
        const r = right(rightSteps);
        add(type, cfg.kx + f.x + r.x, cfg.ky + f.y + r.y);
    };

    put('general', 0, 0);
    put('horse', 1, 0);
    put('chariot', 0, -1);
    put('chariot', 0, 1);
    if (isLord) {
        put('chariot', 1, -1);
        put('chariot', 1, 1);
    }
}

function createChaosWesternBig(state, cfg, add, isLord) {
    if (cfg.type === 'corner') {
        add('king', cfg.kx, cfg.ky);
        add('bishop', cfg.kx + cfg.dx, cfg.ky);
        add('bishop', cfg.kx, cfg.ky + cfg.dy);
        add('queen', cfg.kx + 2 * cfg.dx, cfg.ky);
        add('queen', cfg.kx, cfg.ky + 2 * cfg.dy);
        add('knight', cfg.kx + cfg.dx, cfg.ky + cfg.dy);
        add('rook', cfg.kx + 2 * cfg.dx, cfg.ky + 2 * cfg.dy);
        return;
    }

    const forward = step => ({ x: step * cfg.dx, y: step * cfg.dy });
    const right = step => ({ x: step * cfg.rx, y: step * cfg.ry });
    const put = (type, forwardSteps, rightSteps) => {
        const f = forward(forwardSteps);
        const r = right(rightSteps);
        add(type, cfg.kx + f.x + r.x, cfg.ky + f.y + r.y);
    };

    if (isLord) {
        put('king', 0, 0);
        put('queen', 0, 3);
        put('bishop', 0, -1);
        put('queen', 0, -3);
        put('bishop', 0, 1);
        put('queen', 1, 2);
        put('bishop', 1, 0);
        put('queen', 1, -2);
        put('knight', 0, -2);
        put('rook', 2, -2);
        put('knight', 0, 2);
        put('rook', 2, 2);
    } else {
        put('king', 0, 0);
        put('queen', 0, -2);
        put('queen', 0, 2);
        put('bishop', 0, -1);
        put('bishop', 0, 1);
        put('bishop', 1, 0);
        put('rook', 1, 1);
        put('knight', 1, -1);
    }
}

function createChaosWesternSmall(state, cfg, add, isLord) {
    if (cfg.type === 'corner') {
        add('king', cfg.kx, cfg.ky);
        add('queen', cfg.kx + cfg.dx, cfg.ky);
        add('bishop', cfg.kx, cfg.ky + cfg.dy);
        add('knight', cfg.kx + cfg.dx, cfg.ky + cfg.dy);
        return;
    }

    const forward = step => ({ x: step * cfg.dx, y: step * cfg.dy });
    const right = step => ({ x: step * cfg.rx, y: step * cfg.ry });
    const put = (type, forwardSteps, rightSteps) => {
        const f = forward(forwardSteps);
        const r = right(rightSteps);
        add(type, cfg.kx + f.x + r.x, cfg.ky + f.y + r.y);
    };

    put('king', 0, 0);
    put('queen', 0, 1);
    put('bishop', 0, -1);
    put('knight', 1, 0);
    if (isLord) {
        put('rook', 1, 1);
        put('rook', 1, -1);
    }
}

function spawnTeamPieces(state) {
    const isWestern = state.modeMeta.ruleset === 'chaos-western';
    const chineseFormation = [
        { type: 'elephant', dx: 0, dy: 0 }, { type: 'advisor', dx: 1, dy: 0 },
        { type: 'general', dx: 2, dy: 0 }, { type: 'advisor', dx: 3, dy: 0 },
        { type: 'elephant', dx: 4, dy: 0 }, { type: 'chariot', dx: 5, dy: 0 },
        { type: 'chariot', dx: 0, dy: 1 }, { type: 'horse', dx: 1, dy: 1 },
        { type: 'chariot', dx: 2, dy: 1 }, { type: 'horse', dx: 3, dy: 1 },
        { type: 'cannon', dx: 1, dy: 3 }, { type: 'cannon', dx: 3, dy: 3 },
        { type: 'soldier', dx: 0, dy: 4 }, { type: 'soldier', dx: 2, dy: 4 },
        { type: 'soldier', dx: 4, dy: 4 }
    ];
    const westernFormation = [
        { type: 'queen', dx: 0, dy: 0 }, { type: 'bishop', dx: 1, dy: 0 },
        { type: 'king', dx: 2, dy: 0 }, { type: 'bishop', dx: 3, dy: 0 },
        { type: 'queen', dx: 4, dy: 0 }, { type: 'rook', dx: 5, dy: 0 },
        { type: 'rook', dx: 0, dy: 1 }, { type: 'knight', dx: 1, dy: 1 },
        { type: 'rook', dx: 2, dy: 1 }, { type: 'knight', dx: 3, dy: 1 },
        { type: 'queen', dx: 1, dy: 3 }, { type: 'queen', dx: 3, dy: 3 },
        { type: 'pawn', dx: 0, dy: 4 }, { type: 'pawn', dx: 2, dy: 4 },
        { type: 'pawn', dx: 4, dy: 4 }
    ];
    const formation = isWestern ? westernFormation : chineseFormation;
    const size = state.boardCols;
    const transforms = [
        { owner: 0, tx: dx => dx, ty: dy => dy },
        { owner: 1, tx: dx => dx, ty: dy => (size - 1) - dy },
        { owner: 2, tx: dx => (size - 1) - dx, ty: dy => (size - 1) - dy },
        { owner: 3, tx: dx => (size - 1) - dx, ty: dy => dy }
    ];

    transforms.forEach(transform => {
        formation.forEach(piece => {
            state.pieces.push(createPiece({
                owner: transform.owner,
                type: piece.type,
                x: transform.tx(piece.dx),
                y: transform.ty(piece.dy)
            }));
        });
    });
}

function spawnDuelXiangqi(state) {
    const layout = [
        ['chariot', 0], ['horse', 1], ['elephant', 2], ['advisor', 3], ['general', 4],
        ['advisor', 5], ['elephant', 6], ['horse', 7], ['chariot', 8]
    ];

    layout.forEach(([type, x]) => {
        state.pieces.push(createPiece({ owner: 1, type, x, y: 0 }));
        state.pieces.push(createPiece({ owner: 0, type, x, y: 9 }));
    });

    [1, 7].forEach(x => {
        state.pieces.push(createPiece({ owner: 1, type: 'cannon', x, y: 2 }));
        state.pieces.push(createPiece({ owner: 0, type: 'cannon', x, y: 7 }));
    });

    [0, 2, 4, 6, 8].forEach(x => {
        state.pieces.push(createPiece({ owner: 1, type: 'soldier', x, y: 3 }));
        state.pieces.push(createPiece({ owner: 0, type: 'soldier', x, y: 6 }));
    });
}

function spawnDuelChess(state) {
    const backRank = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    backRank.forEach((type, x) => {
        state.pieces.push(createPiece({ owner: 1, type, x, y: 0 }));
        state.pieces.push(createPiece({ owner: 0, type, x, y: 7 }));
        state.pieces.push(createPiece({ owner: 1, type: 'pawn', x, y: 1 }));
        state.pieces.push(createPiece({ owner: 0, type: 'pawn', x, y: 6 }));
    });
}

function spawnDuelDark(state) {
    const pool = [];
    const addCamp = camp => {
        pool.push({ camp, type: 'general' });
        pool.push({ camp, type: 'advisor' }, { camp, type: 'advisor' });
        pool.push({ camp, type: 'elephant' }, { camp, type: 'elephant' });
        pool.push({ camp, type: 'chariot' }, { camp, type: 'chariot' });
        pool.push({ camp, type: 'horse' }, { camp, type: 'horse' });
        pool.push({ camp, type: 'cannon' }, { camp, type: 'cannon' });
        for (let i = 0; i < 5; i++) {
            pool.push({ camp, type: 'soldier' });
        }
    };

    addCamp('red');
    addCamp('black');

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    let index = 0;
    for (let y = 0; y < state.boardRows; y++) {
        for (let x = 0; x < state.boardCols; x++) {
            const piece = pool[index++];
            state.pieces.push(createPiece({
                camp: piece.camp,
                type: piece.type,
                x,
                y,
                revealed: false
            }));
        }
    }
}

function saveState() {
    if (gameState.isOnline) {
        return;
    }

    const snapshot = cloneState(gameState);
    snapshot.ai.thinking = false;
    moveHistory.push(snapshot);
    if (moveHistory.length > 60) {
        moveHistory.shift();
    }
}

function undoMove() {
    if (gameState.isOnline) {
        alert('在线模式不支持悔棋。');
        return;
    }

    if (moveHistory.length === 0) {
        alert('没有可悔的步骤了。');
        return;
    }

    clearAiTimer();
    const stepsToUndo = gameState.ai.enabled ? Math.min(2, moveHistory.length) : 1;
    let snapshot = null;
    for (let i = 0; i < stepsToUndo; i++) {
        snapshot = moveHistory.pop();
    }

    if (!snapshot) {
        return;
    }

    gameState = cloneState(snapshot);
    gameState.ai.thinking = false;
    clearHints();
    renderPieces();
    updateStatus();
    maybeScheduleAiTurn();
}

function isInsideBoard(state, x, y) {
    return x >= 0 && x < state.boardCols && y >= 0 && y < state.boardRows;
}

function getPieceAtState(state, x, y) {
    return state.pieces.find(piece => piece.x === x && piece.y === y) || null;
}

function getPieceById(state, pieceId) {
    return state.pieces.find(piece => piece.id === pieceId) || null;
}

function getSelectedPiece() {
    return getPieceById(gameState, gameState.selectedPieceId);
}

function getCurrentSeatIndex(state = gameState) {
    return state.alivePlayers[state.currentPlayerIndex] ?? 0;
}

function getPlayersConfig(state = gameState) {
    if (state.modeMeta.category === 'team') {
        return TEAM_PLAYERS;
    }
    if (state.modeMeta.id === 'duel_xiangqi') {
        return DUEL_XIANGQI_PLAYERS;
    }
    if (state.modeMeta.id === 'duel_chess') {
        return DUEL_CHESS_PLAYERS;
    }
    if (state.modeMeta.id === 'duel_dark') {
        const sides = state.modeState.darkSideByPlayer || [null, null];
        return [
            {
                id: 0,
                name: sides[0] === 'red' ? '红方' : sides[0] === 'black' ? '黑方' : '先手',
                color: sides[0] === 'black' ? '#111827' : '#dc2626'
            },
            {
                id: 1,
                name: sides[1] === 'red' ? '红方' : sides[1] === 'black' ? '黑方' : '后手',
                color: sides[1] === 'red' ? '#dc2626' : '#111827'
            }
        ];
    }
    return CHAOS_PLAYERS;
}

function getSeatColor(seatIndex, state = gameState) {
    return getPlayersConfig(state)[seatIndex]?.color || '#475569';
}

function getSeatLabel(seatIndex, state = gameState) {
    const players = getPlayersConfig(state);
    let label = players[seatIndex]?.name || `玩家${seatIndex + 1}`;

    if (state.modeMeta.category === 'duel' && state.isOnline && Array.isArray(state.playerOrder)) {
        const room = RoomManager.getCurrentRoom();
        const playerId = state.playerOrder[seatIndex];
        const onlineName = room?.players?.[playerId]?.name;
        if (onlineName) {
            label = `${onlineName} (${label})`;
        }
    }

    if (!state.isOnline && state.ai.enabled) {
        if (seatIndex === state.ai.playerIndex) {
            label = `电脑(${AI_DIFFICULTY_LABELS[state.ai.difficulty]})`;
        } else if (state.modeMeta.category === 'duel') {
            label = '玩家';
        }
    }

    return label;
}

function escapeHtml(text) {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function isMyTurn() {
    if (!gameState.isOnline) {
        return true;
    }
    return getCurrentSeatIndex(gameState) === gameState.mySeatIndex;
}

function clearHints() {
    document.getElementById('hints').innerHTML = '';
}

function renderPieces() {
    const container = document.getElementById('pieces');
    container.innerHTML = '';

    gameState.pieces.forEach(piece => {
        const visual = getPieceVisual(piece, gameState);
        const element = document.createElement('div');
        element.className = `piece ${gameState.selectedPieceId === piece.id ? 'selected' : ''}`;
        if (visual.isWestern) {
            element.classList.add('western-piece');
        }
        if (visual.faceDown) {
            element.classList.add('face-down-piece');
        }

        element.style.left = `calc(${piece.x} * var(--grid-size))`;
        element.style.top = `calc(${piece.y} * var(--grid-size))`;
        element.style.color = visual.textColor;
        element.style.borderColor = visual.borderColor;
        if (visual.background) {
            element.style.background = visual.background;
        }
        element.textContent = visual.label;
        element.onclick = event => {
            event.stopPropagation();
            handlePieceClick(piece);
        };

        container.appendChild(element);
    });
}

function getPieceVisual(piece, state) {
    const players = getPlayersConfig(state);

    if (state.modeMeta.category === 'chaos' || state.modeMeta.category === 'team') {
        const ownerData = players[piece.owner];
        if (state.modeMeta.ruleset === 'chaos-western') {
            return {
                label: CHAOS_WESTERN_SYMBOLS[piece.type] || '?',
                textColor: ownerData.color,
                borderColor: ownerData.color,
                background: '#ffffff',
                isWestern: true
            };
        }
        return {
            label: CHINESE_LABELS[piece.type] || '?',
            textColor: ownerData.color,
            borderColor: ownerData.color,
            background: '#ffffff',
            isWestern: false
        };
    }

    if (state.modeMeta.id === 'duel_xiangqi') {
        const side = piece.owner === 0 ? 'red' : 'black';
        return {
            label: XIANGQI_LABELS[side][piece.type] || '?',
            textColor: getSeatColor(piece.owner, state),
            borderColor: getSeatColor(piece.owner, state),
            background: piece.owner === 0 ? '#fff1f2' : '#f8fafc',
            isWestern: false
        };
    }

    if (state.modeMeta.id === 'duel_chess') {
        const side = piece.owner === 0 ? 'white' : 'black';
        return {
            label: CHESS_SYMBOLS[side][piece.type] || '?',
            textColor: piece.owner === 0 ? '#2563eb' : '#111827',
            borderColor: getSeatColor(piece.owner, state),
            background: piece.owner === 0 ? '#eff6ff' : '#f8fafc',
            isWestern: true
        };
    }

    if (!piece.revealed) {
        return {
            label: '暗',
            textColor: '#475569',
            borderColor: '#94a3b8',
            background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
            faceDown: true,
            isWestern: false
        };
    }

    return {
        label: XIANGQI_LABELS[piece.camp][piece.type] || '?',
        textColor: piece.camp === 'red' ? '#dc2626' : '#111827',
        borderColor: piece.camp === 'red' ? '#dc2626' : '#111827',
        background: piece.camp === 'red' ? '#fff1f2' : '#f8fafc',
        isWestern: false
    };
}

function handlePieceClick(piece) {
    if (gameState.gameOver) {
        return;
    }

    if (gameState.isOnline && !isMyTurn()) {
        return;
    }

    if (gameState.modeMeta.id === 'duel_dark' && !piece.revealed) {
        applyPlayerAction({ kind: 'flip', pieceId: piece.id });
        return;
    }

    const selectedPiece = getSelectedPiece();
    const currentSeat = getCurrentSeatIndex(gameState);
    const pieceOwner = getPieceController(piece, gameState);

    if (pieceOwner === currentSeat) {
        if (selectedPiece && selectedPiece.id === piece.id) {
            gameState.selectedPieceId = null;
            clearHints();
            renderPieces();
            return;
        }
        gameState.selectedPieceId = piece.id;
        renderPieces();
        showHints(piece);
        return;
    }

    if (selectedPiece) {
        applyPlayerAction({
            kind: 'move',
            pieceId: selectedPiece.id,
            toX: piece.x,
            toY: piece.y
        });
    }
}

function showHints(piece) {
    const hints = document.getElementById('hints');
    hints.innerHTML = '';

    for (let x = 0; x < gameState.boardCols; x++) {
        for (let y = 0; y < gameState.boardRows; y++) {
            if (!canMovePiece(gameState, piece, x, y)) {
                continue;
            }

            const hint = document.createElement('div');
            hint.className = 'hint';
            hint.style.left = `calc(${x} * var(--grid-size))`;
            hint.style.top = `calc(${y} * var(--grid-size))`;
            if (getPieceAtState(gameState, x, y)) {
                hint.classList.add('capture');
            }
            hint.onclick = () => applyPlayerAction({
                kind: 'move',
                pieceId: piece.id,
                toX: x,
                toY: y
            });
            hints.appendChild(hint);
        }
    }
}

function applyPlayerAction(action) {
    if (gameState.gameOver) {
        return false;
    }

    if (!isActionLegal(gameState, action)) {
        return false;
    }

    clearAiTimer();
    saveState();
    gameState = applyAction(gameState, action);
    clearHints();
    renderPieces();
    updateStatus();
    syncCurrentStateIfNeeded();
    maybeScheduleAiTurn();
    return true;
}

function isActionLegal(state, action) {
    const currentSeat = getCurrentSeatIndex(state);

    if (action.kind === 'flip') {
        if (state.modeMeta.id !== 'duel_dark') {
            return false;
        }
        const piece = getPieceById(state, action.pieceId);
        return Boolean(piece && !piece.revealed);
    }

    if (action.kind !== 'move') {
        return false;
    }

    const piece = getPieceById(state, action.pieceId);
    if (!piece) {
        return false;
    }
    if (getPieceController(piece, state) !== currentSeat) {
        return false;
    }

    return canMovePiece(state, piece, action.toX, action.toY);
}

function applyAction(state, action) {
    const nextState = cloneState(state);
    nextState.selectedPieceId = null;
    nextState.ai.thinking = false;
    const actingSeat = getCurrentSeatIndex(state);

    if (action.kind === 'flip') {
        const piece = getPieceById(nextState, action.pieceId);
        if (!piece) {
            return nextState;
        }
        piece.revealed = true;
        if (!nextState.modeState.darkSideByPlayer[0]) {
            nextState.modeState.darkSideByPlayer[actingSeat] = piece.camp;
            nextState.modeState.darkSideByPlayer[1 - actingSeat] = piece.camp === 'red' ? 'black' : 'red';
        }
        resolveAfterAction(nextState, actingSeat);
        return nextState;
    }

    const piece = getPieceById(nextState, action.pieceId);
    if (!piece) {
        return nextState;
    }

    const fromX = piece.x;
    const fromY = piece.y;
    const moveMeta = getSpecialMoveMeta(nextState, piece, action.toX, action.toY);
    const target = moveMeta.target;

    piece.x = action.toX;
    piece.y = action.toY;

    if (target) {
        nextState.pieces = nextState.pieces.filter(item => item.id !== target.id);

        if (nextState.modeMeta.category === 'chaos' || nextState.modeMeta.category === 'team') {
            if (isLeaderPiece(target.type)) {
                inheritTroops(nextState, piece.owner, target.owner);
            }
        }
    }

    if (moveMeta.enPassantCapture) {
        nextState.pieces = nextState.pieces.filter(item => item.id !== moveMeta.enPassantCapture.id);
    }

    if (moveMeta.castlingRook) {
        const rook = getPieceById(nextState, moveMeta.castlingRook.id);
        if (rook) {
            rook.x = moveMeta.castlingRook.toX;
            rook.y = moveMeta.castlingRook.toY;
        }
    }

    if (nextState.modeMeta.id === 'duel_chess' && piece.type === 'pawn') {
        const promotionRow = piece.owner === 0 ? 0 : 7;
        if (piece.y === promotionRow) {
            piece.type = 'queen';
        }
    }

    if (nextState.modeMeta.id === 'duel_chess') {
        updateChessModeStateAfterMove(nextState, piece, fromX, fromY, moveMeta);
    }

    resolveAfterAction(nextState, actingSeat);
    return nextState;
}

function resolveAfterAction(state, actingSeat) {
    if (state.modeMeta.category === 'chaos') {
        if (state.alivePlayers.length === 1) {
            setGameOver(state, `${getSeatLabel(state.alivePlayers[0], state)} 获胜！`, state.alivePlayers[0], 'win');
            return;
        }
        advanceTurn(state);
        return;
    }

    if (state.modeMeta.category === 'team') {
        const survivingTeams = new Set(
            state.alivePlayers.map(playerIndex => TEAM_PLAYERS[playerIndex]?.team)
        );
        if (survivingTeams.size === 1) {
            const winningTeam = [...survivingTeams][0];
            setGameOver(state, `${winningTeam === 0 ? '红队' : '蓝队'} 获胜！`, null, 'win');
            return;
        }
        advanceTurn(state);
        return;
    }

    if (state.modeMeta.id === 'duel_xiangqi') {
        const opponent = 1 - actingSeat;
        if (!findPieceByOwnerAndType(state, opponent, 'general')) {
            setGameOver(state, `${getSeatLabel(actingSeat, state)} 获胜！`, actingSeat, 'win');
            return;
        }
        if (getLegalActionsForSeat(state, opponent).length === 0) {
            if (isXiangqiInCheck(state, opponent)) {
                setGameOver(state, `${getSeatLabel(actingSeat, state)} 将死获胜！`, actingSeat, 'win');
            } else {
                setGameOver(state, '和棋：无子可走。', null, 'draw');
            }
            return;
        }
        advanceTurn(state);
        return;
    }

    if (state.modeMeta.id === 'duel_chess') {
        const opponent = 1 - actingSeat;
        if (!findPieceByOwnerAndType(state, opponent, 'king')) {
            setGameOver(state, `${getSeatLabel(actingSeat, state)} 获胜！`, actingSeat, 'win');
            return;
        }
        if (getLegalActionsForSeat(state, opponent).length === 0) {
            if (isChessInCheck(state, opponent)) {
                setGameOver(state, `${getSeatLabel(actingSeat, state)} 将死获胜！`, actingSeat, 'win');
            } else {
                setGameOver(state, '和棋：逼和。', null, 'draw');
            }
            return;
        }
        advanceTurn(state);
        return;
    }

    const opponent = 1 - actingSeat;
    if (getLegalActionsForSeat(state, opponent).length === 0) {
        setGameOver(state, `${getSeatLabel(actingSeat, state)} 获胜！`, actingSeat, 'win');
        return;
    }
    advanceTurn(state);
}

function setGameOver(state, message, winnerSeat, resultType) {
    state.gameOver = true;
    state.winnerText = message;
    state.winnerSeat = winnerSeat;
    state.resultType = resultType;
}

function advanceTurn(state) {
    state.currentPlayerIndex += 1;
    if (state.currentPlayerIndex >= state.alivePlayers.length) {
        state.currentPlayerIndex = 0;
    }
}

function getPieceController(piece, state) {
    if (state.modeMeta.id === 'duel_dark') {
        if (!piece.revealed) {
            return null;
        }
        const sideByPlayer = state.modeState.darkSideByPlayer || [null, null];
        if (sideByPlayer[0] === piece.camp) {
            return 0;
        }
        if (sideByPlayer[1] === piece.camp) {
            return 1;
        }
        return null;
    }

    return piece.owner;
}

function canMovePiece(state, piece, tx, ty) {
    if (!isInsideBoard(state, tx, ty)) {
        return false;
    }
    if (piece.x === tx && piece.y === ty) {
        return false;
    }

    const target = getPieceAtState(state, tx, ty);

    if (state.modeMeta.category === 'chaos' || state.modeMeta.category === 'team') {
        return canMoveChaosPiece(state, piece, tx, ty, target);
    }
    if (state.modeMeta.id === 'duel_xiangqi') {
        return canMoveXiangqiPiece(state, piece, tx, ty, target);
    }
    if (state.modeMeta.id === 'duel_chess') {
        return canMoveChessPiece(state, piece, tx, ty, target);
    }
    return canMoveDarkPiece(state, piece, tx, ty, target);
}

function canMoveChaosPiece(state, piece, tx, ty, target) {
    if (target && target.owner === piece.owner) {
        return false;
    }

    if (state.modeMeta.category === 'team' && target) {
        if (TEAM_PLAYERS[piece.owner].team === TEAM_PLAYERS[target.owner].team) {
            return false;
        }
    }

    if (state.modeMeta.ruleset === 'chaos-western') {
        return canMoveChaosWestern(state, piece, tx, ty, target);
    }
    return canMoveChaosChinese(state, piece, tx, ty, target);
}

function canMoveChaosChinese(state, piece, tx, ty, target) {
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    switch (piece.type) {
        case 'general':
        case 'soldier':
            return absDx + absDy === 1;
        case 'advisor':
            return absDx === 1 && absDy === 1;
        case 'chariot':
            if (dx !== 0 && dy !== 0) {
                return false;
            }
            return countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
        case 'cannon': {
            if (dx !== 0 && dy !== 0) {
                return false;
            }
            const obstacles = countLineObstacles(state, piece.x, piece.y, tx, ty);
            return target ? obstacles === 1 : obstacles === 0;
        }
        case 'horse':
            return canMoveExtendedHorse(state, piece, tx, ty, state.boardCols >= 16 ? 3 : 2, true);
        case 'elephant':
            if (absDx !== 2 || absDy !== 2) {
                return false;
            }
            return !getPieceAtState(state, piece.x + dx / 2, piece.y + dy / 2);
        default:
            return false;
    }
}

function canMoveChaosWestern(state, piece, tx, ty, target) {
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    switch (piece.type) {
        case 'king':
            return absDx <= 1 && absDy <= 1;
        case 'queen':
            if (dx === 0 || dy === 0) {
                return countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
            }
            if (absDx === absDy) {
                return countDiagonalObstacles(state, piece.x, piece.y, tx, ty) === 0;
            }
            return false;
        case 'rook':
            if (dx !== 0 && dy !== 0) {
                return false;
            }
            return countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
        case 'bishop':
            if (absDx !== absDy) {
                return false;
            }
            return countDiagonalObstacles(state, piece.x, piece.y, tx, ty) === 0;
        case 'knight':
            return canMoveExtendedHorse(state, piece, tx, ty, state.boardCols >= 16 ? 3 : 2, false);
        case 'pawn':
            return absDx + absDy === 1;
        default:
            return false;
    }
}

function canMoveExtendedHorse(state, piece, tx, ty, maxStep, requiresLegCheck) {
    const moves = [
        { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: 2 }, { x: -1, y: -2 },
        { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 }
    ];

    for (const move of moves) {
        let legX = piece.x;
        let legY = piece.y;

        if (requiresLegCheck) {
            if (Math.abs(move.x) === 2) {
                legX += Math.sign(move.x);
            } else {
                legY += Math.sign(move.y);
            }
            if (getPieceAtState(state, legX, legY)) {
                continue;
            }
        }

        for (let step = 1; step <= maxStep; step++) {
            const checkX = piece.x + move.x * step;
            const checkY = piece.y + move.y * step;
            if (!isInsideBoard(state, checkX, checkY)) {
                break;
            }
            if (checkX === tx && checkY === ty) {
                return true;
            }
            if (getPieceAtState(state, checkX, checkY)) {
                break;
            }
        }
    }

    return false;
}

function countLineObstacles(state, x1, y1, x2, y2) {
    let count = 0;
    const xDir = Math.sign(x2 - x1);
    const yDir = Math.sign(y2 - y1);
    let currentX = x1 + xDir;
    let currentY = y1 + yDir;

    while (currentX !== x2 || currentY !== y2) {
        if (getPieceAtState(state, currentX, currentY)) {
            count++;
        }
        currentX += xDir;
        currentY += yDir;
    }

    return count;
}

function countDiagonalObstacles(state, x1, y1, x2, y2) {
    let count = 0;
    const xDir = Math.sign(x2 - x1);
    const yDir = Math.sign(y2 - y1);
    let currentX = x1 + xDir;
    let currentY = y1 + yDir;

    while (currentX !== x2 || currentY !== y2) {
        if (getPieceAtState(state, currentX, currentY)) {
            count++;
        }
        currentX += xDir;
        currentY += yDir;
    }

    return count;
}

function findPieceByOwnerAndType(state, owner, type) {
    return state.pieces.find(piece => piece.owner === owner && piece.type === type) || null;
}

function isLeaderPiece(type) {
    return type === 'general' || type === 'king';
}

function inheritTroops(state, killerOwner, victimOwner) {
    const victimIndex = state.alivePlayers.indexOf(victimOwner);

    state.pieces.forEach(piece => {
        if (piece.owner === victimOwner) {
            piece.owner = killerOwner;
        }
    });

    state.alivePlayers = state.alivePlayers.filter(playerIndex => playerIndex !== victimOwner);

    if (victimIndex !== -1 && victimIndex < state.currentPlayerIndex) {
        state.currentPlayerIndex -= 1;
    }
}

function canMoveXiangqiPiece(state, piece, tx, ty, target) {
    if (target && target.owner === piece.owner) {
        return false;
    }

    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    let basicMoveValid = false;

    switch (piece.type) {
        case 'general':
            if (target && target.type === 'general' && piece.x === tx && countLineObstacles(state, piece.x, piece.y, tx, ty) === 0) {
                basicMoveValid = true;
            } else {
                basicMoveValid = absDx + absDy === 1 && isInsideXiangqiPalace(piece.owner, tx, ty);
            }
            break;
        case 'advisor':
            basicMoveValid = absDx === 1 && absDy === 1 && isInsideXiangqiPalace(piece.owner, tx, ty);
            break;
        case 'elephant':
            basicMoveValid = absDx === 2
                && absDy === 2
                && !getPieceAtState(state, piece.x + dx / 2, piece.y + dy / 2)
                && staysOnOwnXiangqiSide(piece.owner, ty);
            break;
        case 'horse':
            basicMoveValid = canMoveStandardHorse(state, piece, tx, ty);
            break;
        case 'chariot':
            basicMoveValid = (dx === 0 || dy === 0) && countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
            break;
        case 'cannon':
            if (dx === 0 || dy === 0) {
                const obstacles = countLineObstacles(state, piece.x, piece.y, tx, ty);
                basicMoveValid = target ? obstacles === 1 : obstacles === 0;
            }
            break;
        case 'soldier':
            basicMoveValid = canMoveXiangqiSoldier(piece.owner, piece.x, piece.y, tx, ty);
            break;
        default:
            basicMoveValid = false;
    }

    if (!basicMoveValid) {
        return false;
    }

    const simulated = simulateSimpleMove(state, piece.id, tx, ty);
    return !isXiangqiInCheck(simulated, piece.owner);
}

function isInsideXiangqiPalace(owner, x, y) {
    if (x < 3 || x > 5) {
        return false;
    }
    return owner === 0 ? y >= 7 && y <= 9 : y >= 0 && y <= 2;
}

function staysOnOwnXiangqiSide(owner, y) {
    return owner === 0 ? y >= 5 : y <= 4;
}

function hasCrossedXiangqiRiver(owner, y) {
    return owner === 0 ? y <= 4 : y >= 5;
}

function canMoveXiangqiSoldier(owner, fromX, fromY, toX, toY) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const forward = owner === 0 ? -1 : 1;

    if (dy === forward && dx === 0) {
        return true;
    }

    if (hasCrossedXiangqiRiver(owner, fromY) && dy === 0 && Math.abs(dx) === 1) {
        return true;
    }

    return false;
}

function canMoveStandardHorse(state, piece, tx, ty) {
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (!((absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1))) {
        return false;
    }

    const legX = absDx === 2 ? piece.x + Math.sign(dx) : piece.x;
    const legY = absDy === 2 ? piece.y + Math.sign(dy) : piece.y;
    return !getPieceAtState(state, legX, legY);
}

function simulateSimpleMove(state, pieceId, tx, ty) {
    const simulated = cloneState(state);
    const piece = getPieceById(simulated, pieceId);
    if (!piece) {
        return simulated;
    }

    const fromX = piece.x;
    const fromY = piece.y;
    const moveMeta = getSpecialMoveMeta(simulated, piece, tx, ty);

    if (moveMeta.target) {
        simulated.pieces = simulated.pieces.filter(item => item.id !== moveMeta.target.id);
    }
    if (moveMeta.enPassantCapture) {
        simulated.pieces = simulated.pieces.filter(item => item.id !== moveMeta.enPassantCapture.id);
    }

    piece.x = tx;
    piece.y = ty;

    if (moveMeta.castlingRook) {
        const rook = getPieceById(simulated, moveMeta.castlingRook.id);
        if (rook) {
            rook.x = moveMeta.castlingRook.toX;
            rook.y = moveMeta.castlingRook.toY;
        }
    }

    if (simulated.modeMeta.id === 'duel_chess') {
        if (piece.type === 'pawn') {
            const promotionRow = piece.owner === 0 ? 0 : 7;
            if (piece.y === promotionRow) {
                piece.type = 'queen';
            }
        }
        updateChessModeStateAfterMove(simulated, piece, fromX, fromY, moveMeta);
    }

    return simulated;
}

function isXiangqiInCheck(state, owner) {
    const general = findPieceByOwnerAndType(state, owner, 'general');
    if (!general) {
        return true;
    }

    const opponent = 1 - owner;
    const enemyGeneral = findPieceByOwnerAndType(state, opponent, 'general');
    if (
        enemyGeneral
        && enemyGeneral.x === general.x
        && countLineObstacles(state, general.x, general.y, enemyGeneral.x, enemyGeneral.y) === 0
    ) {
        return true;
    }

    return state.pieces.some(piece => {
        if (piece.owner !== opponent) {
            return false;
        }
        return canAttackXiangqiSquare(state, piece, general.x, general.y);
    });
}

function canAttackXiangqiSquare(state, piece, tx, ty) {
    const target = getPieceAtState(state, tx, ty);
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    switch (piece.type) {
        case 'general':
            if (piece.x === tx && target?.type === 'general') {
                return countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
            }
            return absDx + absDy === 1 && isInsideXiangqiPalace(piece.owner, tx, ty);
        case 'advisor':
            return absDx === 1 && absDy === 1 && isInsideXiangqiPalace(piece.owner, tx, ty);
        case 'elephant':
            return absDx === 2
                && absDy === 2
                && !getPieceAtState(state, piece.x + dx / 2, piece.y + dy / 2)
                && staysOnOwnXiangqiSide(piece.owner, ty);
        case 'horse':
            return canMoveStandardHorse(state, piece, tx, ty);
        case 'chariot':
            return (dx === 0 || dy === 0) && countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
        case 'cannon':
            return (dx === 0 || dy === 0) && target && countLineObstacles(state, piece.x, piece.y, tx, ty) === 1;
        case 'soldier':
            return canMoveXiangqiSoldier(piece.owner, piece.x, piece.y, tx, ty);
        default:
            return false;
    }
}

function getSpecialMoveMeta(state, piece, tx, ty) {
    const meta = {
        target: getPieceAtState(state, tx, ty),
        castlingRook: null,
        enPassantCapture: null
    };

    if (state.modeMeta.id !== 'duel_chess') {
        return meta;
    }

    const dx = tx - piece.x;
    const dy = ty - piece.y;

    if (piece.type === 'king' && dy === 0 && Math.abs(dx) === 2) {
        const rookFromX = dx > 0 ? 7 : 0;
        const rookToX = dx > 0 ? tx - 1 : tx + 1;
        const rook = getPieceAtState(state, rookFromX, piece.y);
        if (rook && rook.type === 'rook' && rook.owner === piece.owner) {
            meta.castlingRook = {
                id: rook.id,
                toX: rookToX,
                toY: piece.y
            };
        }
        return meta;
    }

    if (piece.type === 'pawn' && !meta.target && Math.abs(dx) === 1) {
        const enPassant = state.modeState?.enPassant;
        if (
            enPassant
            && enPassant.x === tx
            && enPassant.y === ty
            && enPassant.owner !== piece.owner
        ) {
            meta.enPassantCapture = getPieceAtState(state, tx, piece.y);
        }
    }

    return meta;
}

function getChessCastlingRights(state, owner) {
    return state.modeState?.castlingRights?.[owner] || { kingSide: false, queenSide: false };
}

function canCastleChess(state, king, tx, ty) {
    if (ty !== king.y || isChessInCheck(state, king.owner)) {
        return false;
    }

    const side = tx > king.x ? 'kingSide' : 'queenSide';
    const rights = getChessCastlingRights(state, king.owner);
    if (!rights[side]) {
        return false;
    }

    const rookX = side === 'kingSide' ? 7 : 0;
    const rook = getPieceAtState(state, rookX, king.y);
    if (!rook || rook.type !== 'rook' || rook.owner !== king.owner) {
        return false;
    }

    const step = side === 'kingSide' ? 1 : -1;
    for (let x = king.x + step; x !== rookX; x += step) {
        if (getPieceAtState(state, x, king.y)) {
            return false;
        }
    }

    const intermediateState = cloneState(state);
    const intermediateKing = getPieceById(intermediateState, king.id);
    intermediateKing.x = king.x + step;
    intermediateKing.y = king.y;
    if (isChessInCheck(intermediateState, king.owner)) {
        return false;
    }

    const finalState = simulateSimpleMove(state, king.id, tx, ty);
    return !isChessInCheck(finalState, king.owner);
}

function updateChessModeStateAfterMove(state, piece, fromX, fromY, moveMeta) {
    if (!state.modeState.castlingRights) {
        state.modeState.castlingRights = {
            0: { kingSide: true, queenSide: true },
            1: { kingSide: true, queenSide: true }
        };
    }

    state.modeState.enPassant = null;
    const rights = state.modeState.castlingRights;
    const ownerRights = rights[piece.owner];

    if (piece.type === 'king') {
        ownerRights.kingSide = false;
        ownerRights.queenSide = false;
    }

    if (piece.type === 'rook') {
        if (fromY === 7 && piece.owner === 0) {
            if (fromX === 0) {
                ownerRights.queenSide = false;
            } else if (fromX === 7) {
                ownerRights.kingSide = false;
            }
        }
        if (fromY === 0 && piece.owner === 1) {
            if (fromX === 0) {
                ownerRights.queenSide = false;
            } else if (fromX === 7) {
                ownerRights.kingSide = false;
            }
        }
    }

    const capturedRook = moveMeta.enPassantCapture || moveMeta.target;
    if (capturedRook && capturedRook.type === 'rook') {
        const capturedRights = rights[capturedRook.owner];
        if (capturedRook.owner === 0 && capturedRook.y === 7) {
            if (capturedRook.x === 0) {
                capturedRights.queenSide = false;
            } else if (capturedRook.x === 7) {
                capturedRights.kingSide = false;
            }
        }
        if (capturedRook.owner === 1 && capturedRook.y === 0) {
            if (capturedRook.x === 0) {
                capturedRights.queenSide = false;
            } else if (capturedRook.x === 7) {
                capturedRights.kingSide = false;
            }
        }
    }

    if (piece.type === 'pawn' && Math.abs(piece.y - fromY) === 2) {
        const direction = piece.owner === 0 ? -1 : 1;
        state.modeState.enPassant = {
            x: fromX,
            y: fromY + direction,
            owner: piece.owner
        };
    }
}

function canMoveChessPiece(state, piece, tx, ty, target) {
    if (target && target.owner === piece.owner) {
        return false;
    }

    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    let basicMoveValid = false;

    switch (piece.type) {
        case 'king':
            if (absDy === 0 && absDx === 2) {
                basicMoveValid = canCastleChess(state, piece, tx, ty);
            } else {
                basicMoveValid = absDx <= 1 && absDy <= 1;
            }
            break;
        case 'queen':
            basicMoveValid = canMoveChessSlider(state, piece, tx, ty, 'queen');
            break;
        case 'rook':
            basicMoveValid = canMoveChessSlider(state, piece, tx, ty, 'rook');
            break;
        case 'bishop':
            basicMoveValid = canMoveChessSlider(state, piece, tx, ty, 'bishop');
            break;
        case 'knight':
            basicMoveValid = (absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1);
            break;
        case 'pawn':
            basicMoveValid = canMoveChessPawn(state, piece, tx, ty, target);
            break;
        default:
            basicMoveValid = false;
    }

    if (!basicMoveValid) {
        return false;
    }

    const simulated = simulateSimpleMove(state, piece.id, tx, ty);
    return !isChessInCheck(simulated, piece.owner);
}

function canMoveChessSlider(state, piece, tx, ty, type) {
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (type === 'rook') {
        return (dx === 0 || dy === 0) && countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
    }
    if (type === 'bishop') {
        return absDx === absDy && countDiagonalObstacles(state, piece.x, piece.y, tx, ty) === 0;
    }
    if (dx === 0 || dy === 0) {
        return countLineObstacles(state, piece.x, piece.y, tx, ty) === 0;
    }
    return absDx === absDy && countDiagonalObstacles(state, piece.x, piece.y, tx, ty) === 0;
}

function canMoveChessPawn(state, piece, tx, ty, target) {
    const dir = piece.owner === 0 ? -1 : 1;
    const startRow = piece.owner === 0 ? 6 : 1;
    const dx = tx - piece.x;
    const dy = ty - piece.y;

    if (dx === 0 && !target) {
        if (dy === dir) {
            return true;
        }
        if (piece.y === startRow && dy === dir * 2) {
            return !getPieceAtState(state, piece.x, piece.y + dir);
        }
    }

    if (Math.abs(dx) === 1 && dy === dir) {
        if (target) {
            return true;
        }

        const enPassant = state.modeState?.enPassant;
        return Boolean(
            enPassant
            && enPassant.x === tx
            && enPassant.y === ty
            && enPassant.owner !== piece.owner
            && getPieceAtState(state, tx, piece.y)?.type === 'pawn'
        );
    }

    return false;
}

function isChessInCheck(state, owner) {
    const king = findPieceByOwnerAndType(state, owner, 'king');
    if (!king) {
        return true;
    }

    return state.pieces.some(piece => {
        if (piece.owner === owner) {
            return false;
        }
        return canAttackChessSquare(state, piece, king.x, king.y);
    });
}

function canAttackChessSquare(state, piece, tx, ty) {
    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    switch (piece.type) {
        case 'king':
            return absDx <= 1 && absDy <= 1;
        case 'queen':
            return canMoveChessSlider(state, piece, tx, ty, 'queen');
        case 'rook':
            return canMoveChessSlider(state, piece, tx, ty, 'rook');
        case 'bishop':
            return canMoveChessSlider(state, piece, tx, ty, 'bishop');
        case 'knight':
            return (absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1);
        case 'pawn': {
            const dir = piece.owner === 0 ? -1 : 1;
            return absDx === 1 && dy === dir;
        }
        default:
            return false;
    }
}

function canMoveDarkPiece(state, piece, tx, ty, target) {
    if (!piece.revealed) {
        return false;
    }

    if (target && !target.revealed) {
        return false;
    }

    const owner = getPieceController(piece, state);
    if (owner === null) {
        return false;
    }

    if (target && getPieceController(target, state) === owner) {
        return false;
    }

    const dx = tx - piece.x;
    const dy = ty - piece.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (piece.type === 'cannon') {
        if (dx !== 0 && dy !== 0) {
            return false;
        }
        if (!target) {
            return absDx + absDy === 1;
        }
        return countLineObstacles(state, piece.x, piece.y, tx, ty) === 1 && canDarkCapture(piece, target, state);
    }

    if (absDx + absDy !== 1) {
        return false;
    }

    if (!target) {
        return true;
    }

    return canDarkCapture(piece, target, state);
}

function canDarkCapture(attacker, target, state) {
    const attackerOwner = getPieceController(attacker, state);
    const targetOwner = getPieceController(target, state);

    if (attackerOwner === null || targetOwner === null || attackerOwner === targetOwner) {
        return false;
    }

    if (attacker.type === 'cannon') {
        return true;
    }
    if (target.type === 'cannon') {
        return attacker.type !== 'soldier';
    }
    if (attacker.type === 'soldier' && target.type === 'general') {
        return true;
    }
    if (attacker.type === 'general' && target.type === 'soldier') {
        return false;
    }

    return DARK_RANKS[attacker.type] >= DARK_RANKS[target.type];
}

function getLegalActionsForSeat(state, seatIndex) {
    if (state.gameOver) {
        return [];
    }

    const actions = [];

    if (state.modeMeta.id === 'duel_dark') {
        state.pieces.forEach(piece => {
            if (!piece.revealed) {
                actions.push({ kind: 'flip', pieceId: piece.id });
            }
        });
    }

    state.pieces.forEach(piece => {
        if (getPieceController(piece, state) !== seatIndex) {
            return;
        }
        if (state.modeMeta.id === 'duel_dark' && !piece.revealed) {
            return;
        }

        for (let x = 0; x < state.boardCols; x++) {
            for (let y = 0; y < state.boardRows; y++) {
                if (canMovePiece(state, piece, x, y)) {
                    actions.push({
                        kind: 'move',
                        pieceId: piece.id,
                        toX: x,
                        toY: y
                    });
                }
            }
        }
    });

    return actions;
}

function maybeScheduleAiTurn() {
    clearAiTimer();

    if (gameState.isOnline || gameState.gameOver || !gameState.ai.enabled) {
        return;
    }

    if (getCurrentSeatIndex(gameState) !== gameState.ai.playerIndex) {
        return;
    }

    gameState.ai.thinking = true;
    updateStatus();

    aiTimerId = setTimeout(() => {
        if (gameState.gameOver || getCurrentSeatIndex(gameState) !== gameState.ai.playerIndex) {
            gameState.ai.thinking = false;
            updateStatus();
            return;
        }

        const action = chooseAiAction(gameState, gameState.ai.playerIndex, gameState.ai.difficulty);
        gameState.ai.thinking = false;
        updateStatus();

        if (action) {
            applyPlayerAction(action);
        }
    }, 380);
}

function chooseAiAction(state, aiSeat, difficulty) {
    const profile = AI_PROFILES[difficulty] || AI_PROFILES.easy;
    let actions = getLegalActionsForSeat(state, aiSeat);
    if (!actions.length) {
        return null;
    }

    if (state.modeMeta.id === 'duel_dark') {
        const moveActions = actions.filter(action => action.kind === 'move');
        const flipActions = actions.filter(action => action.kind === 'flip');

        if (!moveActions.length && flipActions.length) {
            return flipActions[Math.floor(Math.random() * flipActions.length)];
        }

        actions = moveActions.length ? moveActions : actions;
    }

    const ordered = actions
        .map(action => ({ action, score: roughActionScore(state, action, aiSeat) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, profile.topCandidates);

    if (profile.randomChance > 0 && Math.random() < profile.randomChance) {
        const pool = ordered.slice(0, Math.min(profile.randomPool, ordered.length));
        return pool[Math.floor(Math.random() * pool.length)].action;
    }

    let bestScore = -Infinity;
    let bestActions = [];

    ordered.forEach(({ action }) => {
        const nextState = applyAction(state, action);
        const score = minimax(nextState, profile.depth - 1, -Infinity, Infinity, aiSeat);
        if (score > bestScore) {
            bestScore = score;
            bestActions = [action];
        } else if (score === bestScore) {
            bestActions.push(action);
        }
    });

    if (!bestActions.length) {
        return ordered[0].action;
    }

    return bestActions[Math.floor(Math.random() * bestActions.length)];
}

function minimax(state, depth, alpha, beta, maximizingSeat) {
    if (depth <= 0 || state.gameOver) {
        return evaluateState(state, maximizingSeat);
    }

    const seatToMove = getCurrentSeatIndex(state);
    let actions = getLegalActionsForSeat(state, seatToMove);
    if (!actions.length) {
        return evaluateState(state, maximizingSeat);
    }

    if (state.modeMeta.id === 'duel_dark') {
        const moveActions = actions.filter(action => action.kind === 'move');
        actions = moveActions.length ? moveActions : [];
        if (!actions.length) {
            return evaluateState(state, maximizingSeat);
        }
    }

    const ordered = actions
        .map(action => ({ action, score: roughActionScore(state, action, seatToMove) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);

    if (seatToMove === maximizingSeat) {
        let value = -Infinity;
        for (const { action } of ordered) {
            const nextState = applyAction(state, action);
            value = Math.max(value, minimax(nextState, depth - 1, alpha, beta, maximizingSeat));
            alpha = Math.max(alpha, value);
            if (beta <= alpha) {
                break;
            }
        }
        return value;
    }

    let value = Infinity;
    for (const { action } of ordered) {
        const nextState = applyAction(state, action);
        value = Math.min(value, minimax(nextState, depth - 1, alpha, beta, maximizingSeat));
        beta = Math.min(beta, value);
        if (beta <= alpha) {
            break;
        }
    }
    return value;
}

function roughActionScore(state, action, seatIndex) {
    if (action.kind === 'flip') {
        return 5 + Math.random();
    }

    const piece = getPieceById(state, action.pieceId);
    const target = getPieceAtState(state, action.toX, action.toY);
    let score = target ? getPieceValue(target, state) : 0;

    if (piece && state.modeMeta.id === 'duel_chess' && piece.type === 'pawn') {
        const promotionRow = piece.owner === 0 ? 0 : 7;
        if (action.toY === promotionRow) {
            score += 8;
        }
    }

    if (piece && state.modeMeta.id === 'duel_xiangqi' && piece.type === 'soldier') {
        score += seatIndex === 0 ? (6 - action.toY) * 0.1 : (action.toY - 3) * 0.1;
    }

    return score + Math.random() * 0.01;
}

function evaluateState(state, seatIndex) {
    if (state.gameOver) {
        if (state.resultType === 'draw') {
            return 0;
        }
        return state.winnerSeat === seatIndex ? 100000 : -100000;
    }

    let score = 0;

    state.pieces.forEach(piece => {
        const controller = getPieceController(piece, state);

        if (state.modeMeta.id === 'duel_dark' && !piece.revealed) {
            return;
        }

        if (controller === null) {
            return;
        }

        const value = getPieceValue(piece, state);
        score += controller === seatIndex ? value : -value;
    });

    if (state.modeMeta.category === 'duel' && state.modeMeta.id !== 'duel_dark') {
        const myMoves = getLegalActionsForSeat(state, seatIndex).length;
        const enemyMoves = getLegalActionsForSeat(state, 1 - seatIndex).length;
        score += (myMoves - enemyMoves) * 0.2;
    }

    return score;
}

function getPieceValue(piece, state) {
    if (state.modeMeta.id === 'duel_chess') {
        return {
            king: 200,
            queen: 18,
            rook: 10,
            bishop: 6,
            knight: 6,
            pawn: 2
        }[piece.type] || 1;
    }

    if (state.modeMeta.id === 'duel_xiangqi' || state.modeMeta.id === 'duel_dark') {
        return {
            general: 200,
            chariot: 12,
            horse: 7,
            cannon: 7,
            advisor: 3,
            elephant: 3,
            soldier: 2
        }[piece.type] || 1;
    }

    return {
        general: 100,
        king: 100,
        queen: 9,
        chariot: 6,
        rook: 6,
        horse: 4,
        knight: 4,
        elephant: 3,
        bishop: 3,
        cannon: 4,
        advisor: 2,
        pawn: 1,
        soldier: 1
    }[piece.type] || 1;
}

function updateStatus(overrideText = '') {
    const statusDiv = document.getElementById('status');
    const board = document.getElementById('board-container');

    if (overrideText) {
        statusDiv.innerHTML = overrideText;
        return;
    }

    if (gameState.gameOver) {
        statusDiv.textContent = gameState.winnerText;
        board.style.borderColor = gameState.winnerSeat !== null
            ? getSeatColor(gameState.winnerSeat, gameState)
            : '#64748b';
        return;
    }

    const seat = getCurrentSeatIndex(gameState);
    const label = escapeHtml(getSeatLabel(seat, gameState));
    const color = getSeatColor(seat, gameState);
    let html = `当前回合: <span style="color:${color}">${label}</span>`;

    if (gameState.isOnline) {
        html += isMyTurn()
            ? ' <span class="my-turn">(你的回合)</span>'
            : ' <span class="waiting-turn">(等待对手)</span>';
    } else if (gameState.ai.enabled && seat === gameState.ai.playerIndex) {
        html += gameState.ai.thinking
            ? ' <span class="waiting-turn">(AI 思考中...)</span>'
            : ' <span class="waiting-turn">(电脑回合)</span>';
    }

    statusDiv.innerHTML = html;
    board.style.borderColor = color;
}

function syncCurrentStateIfNeeded() {
    if (!gameState.isOnline) {
        if (gameState.gameOver && gameState.winnerText) {
            setTimeout(() => alert(gameState.winnerText), 100);
        }
        return;
    }

    RoomManager.syncGameState({
        pieces: gameState.pieces,
        currentPlayerIndex: gameState.currentPlayerIndex,
        alivePlayers: gameState.alivePlayers,
        gameOver: gameState.gameOver,
        winnerText: gameState.winnerText,
        winnerSeat: gameState.winnerSeat,
        resultType: gameState.resultType,
        modeState: gameState.modeState
    });

    if (gameState.gameOver && gameState.winnerText) {
        setTimeout(() => alert(gameState.winnerText), 100);
    }
}
