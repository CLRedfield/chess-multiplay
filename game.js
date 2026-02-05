// --- 配置常量 ---
let BOARD_SIZE = 16;

// 玩家配置 (逆时针顺序: 上 -> 左上 -> 左 -> 左下 -> 下 -> 右下 -> 右 -> 右上)
const PLAYERS_DATA = [
    { id: 0, name: "主公", color: "#e74c3c", isLord: true },   // 红 (上-主公)
    { id: 1, name: "诸侯A", color: "#e67e22", isLord: false }, // 橙 (左上)
    { id: 2, name: "诸侯B", color: "#f1c40f", isLord: false }, // 黄 (左)
    { id: 3, name: "诸侯C", color: "#2ecc71", isLord: false }, // 绿 (左下)
    { id: 4, name: "诸侯D", color: "#00ffd0", isLord: false }, // 青 (下)
    { id: 5, name: "诸侯E", color: "#3498db", isLord: false }, // 蓝 (右下)
    { id: 6, name: "诸侯F", color: "#9b59b6", isLord: false }, // 紫 (右)
    { id: 7, name: "诸侯G", color: "#34495e", isLord: false }, // 黑 (右上)
];

let gameState = {
    pieces: [],
    currentPlayerIndex: 0,
    selectedPiece: null,
    alivePlayers: [],
    totalPlayers: 5,
    gameMode: 'chinese', // 'chinese' or 'western'
    boardSize: 16
};
let moveHistory = [];

// --- 游戏流程 ---
function startGame() {
    const count = parseInt(document.getElementById('player-count').value);
    const selectedCard = document.querySelector('.mode-card.selected');

    gameState.totalPlayers = count;
    gameState.gameMode = selectedCard.dataset.mode;
    gameState.boardSize = parseInt(selectedCard.dataset.board);
    BOARD_SIZE = gameState.boardSize;

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'flex';
    initBoard();
}

function saveState() {
    const snapshot = {
        pieces: JSON.parse(JSON.stringify(gameState.pieces)),
        currentPlayerIndex: gameState.currentPlayerIndex,
        alivePlayers: [...gameState.alivePlayers]
    };
    moveHistory.push(snapshot);
    if (moveHistory.length > 50) moveHistory.shift();
}

function undoMove() {
    if (moveHistory.length === 0) {
        alert("没有可以悔的棋了！");
        return;
    }
    const lastState = moveHistory.pop();
    gameState.pieces = lastState.pieces;
    gameState.currentPlayerIndex = lastState.currentPlayerIndex;
    gameState.alivePlayers = lastState.alivePlayers;
    gameState.selectedPiece = null;
    document.getElementById('hints').innerHTML = '';
    renderPieces();
    updateStatus();
}

function initBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    grid.className = `grid-layer grid-${BOARD_SIZE}`;

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }

    gameState.pieces = [];
    spawnPieces();

    const activeIds = new Set(gameState.pieces.map(p => p.owner));
    gameState.alivePlayers = Array.from(activeIds).sort((a, b) => a - b);
    gameState.currentPlayerIndex = 0;

    renderPieces();
    updateStatus();
}

// --- 核心布局算法 ---
function spawnPieces() {
    const size = BOARD_SIZE;
    const mid = Math.floor(size / 2);

    // 8个槽位配置
    const slots = [
        // 0. 主公 (正上) - 面向下
        { id: 0, type: 'cardinal', kx: mid - 1, ky: 0, dx: 0, dy: 1, rx: -1, ry: 0 },
        // 1. 左上角
        { id: 1, type: 'corner', kx: 0, ky: 0, dx: 1, dy: 1 },
        // 2. 正左 - 面向右
        { id: 2, type: 'cardinal', kx: 0, ky: mid - 1, dx: 1, dy: 0, rx: 0, ry: 1 },
        // 3. 左下角
        { id: 3, type: 'corner', kx: 0, ky: size - 1, dx: 1, dy: -1 },
        // 4. 正下 - 面向上
        { id: 4, type: 'cardinal', kx: mid, ky: size - 1, dx: 0, dy: -1, rx: 1, ry: 0 },
        // 5. 右下角
        { id: 5, type: 'corner', kx: size - 1, ky: size - 1, dx: -1, dy: -1 },
        // 6. 正右 - 面向左
        { id: 6, type: 'cardinal', kx: size - 1, ky: mid, dx: -1, dy: 0, rx: 0, ry: -1 },
        // 7. 右上角
        { id: 7, type: 'corner', kx: size - 1, ky: 0, dx: -1, dy: 1 }
    ];

    let chosenIndices = [];
    switch (gameState.totalPlayers) {
        case 5: chosenIndices = [0, 2, 4, 6, 7]; break;
        case 6: chosenIndices = [0, 2, 3, 4, 6, 7]; break;
        case 7: chosenIndices = [0, 1, 2, 3, 4, 6, 7]; break;
        case 8: chosenIndices = [0, 1, 2, 3, 4, 5, 6, 7]; break;
        default: chosenIndices = [0, 2, 4, 6, 7];
    }

    chosenIndices.forEach((slotIdx, playerIndex) => {
        createFormation(slots[slotIdx], playerIndex);
    });
}

function createFormation(cfg, pid) {
    const isLord = PLAYERS_DATA[pid].isLord;
    const isSmall = BOARD_SIZE === 10;
    const isWestern = gameState.gameMode === 'western';

    const add = (type, x, y) => {
        if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
            gameState.pieces.push({
                id: Math.random().toString(36),
                owner: pid,
                type: type,
                x: x,
                y: y
            });
        }
    };

    // 根据模式调用不同的布局函数
    if (isWestern && isSmall) {
        createFormationWesternSmall(cfg, add, isLord);
    } else if (isWestern && !isSmall) {
        createFormationWesternBig(cfg, add, isLord);
    } else if (!isWestern && isSmall) {
        createFormationChineseSmall(cfg, add, isLord);
    } else {
        createFormationChineseBig(cfg, add, isLord);
    }
}

// ========================================
// 中国象棋 - 大棋盘 (16×16)
// ========================================
function createFormationChineseBig(cfg, add, isLord) {
    if (cfg.type === 'corner') {
        // 角落布局 (L型)
        add('将', cfg.kx, cfg.ky);
        add('士', cfg.kx + 1 * cfg.dx, cfg.ky);
        add('士', cfg.kx, cfg.ky + 1 * cfg.dy);
        add('车', cfg.kx + 2 * cfg.dx, cfg.ky);
        add('车', cfg.kx, cfg.ky + 2 * cfg.dy);
        add('马', cfg.kx + 1 * cfg.dx, cfg.ky + 1 * cfg.dy);
        add('炮', cfg.kx + 2 * cfg.dx, cfg.ky + 2 * cfg.dy);
    } else {
        // 正向布局
        const forward = (n) => ({ x: n * cfg.dx, y: n * cfg.dy });
        const right = (n) => ({ x: n * cfg.rx, y: n * cfg.ry });
        const put = (t, f, r) => {
            const fVec = forward(f);
            const rVec = right(r);
            add(t, cfg.kx + fVec.x + rVec.x, cfg.ky + fVec.y + rVec.y);
        };

        put('将', 0, 0);
        if (isLord) {
            put('士', 0, -1); put('士', 0, 1);
            put('马', 0, -2); put('马', 0, 2);
            put('车', 0, -3); put('车', 0, 3);
            put('车', 1, 2); put('车', 1, -2);
            put('炮', 2, -2); put('炮', 2, 2);
            put('士', 1, 0);
        } else {
            put('士', 0, -1); put('士', 0, 1);
            put('车', 0, -2); put('车', 0, 2);
            put('马', 1, -1);
            put('炮', 1, 1);
        }
    }
}

// ========================================
// 中国象棋 - 小棋盘 (10×10)
// ========================================
function createFormationChineseSmall(cfg, add, isLord) {
    if (cfg.type === 'corner') {
        // 角落布局 (L型) - 精简版
        add('将', cfg.kx, cfg.ky);
        add('车', cfg.kx + 1 * cfg.dx, cfg.ky);
        add('车', cfg.kx, cfg.ky + 1 * cfg.dy);
        add('马', cfg.kx + 1 * cfg.dx, cfg.ky + 1 * cfg.dy);
    } else {
        // 正向布局
        const forward = (n) => ({ x: n * cfg.dx, y: n * cfg.dy });
        const right = (n) => ({ x: n * cfg.rx, y: n * cfg.ry });
        const put = (t, f, r) => {
            const fVec = forward(f);
            const rVec = right(r);
            add(t, cfg.kx + fVec.x + rVec.x, cfg.ky + fVec.y + rVec.y);
        };

        put('将', 0, 0);
        if (isLord) {
            put('马', 1, 0);
            put('车', 0, -1); put('车', 0, 1);
            put('车', 1, -1); put('车', 1, 1);
        } else {
            put('马', 1, 0);
            put('车', 0, -1); put('车', 0, 1);
        }
    }
}

// ========================================
// 国际象棋 - 大棋盘 (16×16)
// ========================================
function createFormationWesternBig(cfg, add, isLord) {
    if (cfg.type === 'corner') {
        // 角落布局 (L型)
        add('王', cfg.kx, cfg.ky);
        add('象', cfg.kx + 1 * cfg.dx, cfg.ky);
        add('象', cfg.kx, cfg.ky + 1 * cfg.dy);
        add('后', cfg.kx + 2 * cfg.dx, cfg.ky);
        add('后', cfg.kx, cfg.ky + 2 * cfg.dy);
        add('马', cfg.kx + 1 * cfg.dx, cfg.ky + 1 * cfg.dy);
        add('车', cfg.kx + 2 * cfg.dx, cfg.ky + 2 * cfg.dy);
    } else {
        // 正向布局
        const forward = (n) => ({ x: n * cfg.dx, y: n * cfg.dy });
        const right = (n) => ({ x: n * cfg.rx, y: n * cfg.ry });
        const put = (t, f, r) => {
            const fVec = forward(f);
            const rVec = right(r);
            add(t, cfg.kx + fVec.x + rVec.x, cfg.ky + fVec.y + rVec.y);
        };


        if (isLord) {
            put('王', 0, 0); put('后', 0, 3);
            put('象', 0, -1); put('后', 0, -3);
            put('象', 0, 1); put('后', 1, 2);
            put('象', 1, 0); put('后', 1, -2);
            put('马', 0, -2); put('车', 2, -2);
            put('马', 0, 2); put('车', 2, 2);
        }
        else {
            put('王', 0, 0);
            put('后', 0, -2); put('后', 0, 2);
            put('象', 0, -1); put('象', 0, 1); put('象', 1, 0);
            put('车', 1, 1);
            put('马', 1, -1);
        }
    }
}

// ========================================
// 国际象棋 - 小棋盘 (10×10)
// ========================================
function createFormationWesternSmall(cfg, add, isLord) {
    if (cfg.type === 'corner') {
        // 角落布局 (L型) - 精简版
        add('王', cfg.kx, cfg.ky);
        add('后', cfg.kx + 1 * cfg.dx, cfg.ky);
        add('象', cfg.kx, cfg.ky + 1 * cfg.dy);
        add('马', cfg.kx + 1 * cfg.dx, cfg.ky + 1 * cfg.dy);
    } else {
        // 正向布局
        const forward = (n) => ({ x: n * cfg.dx, y: n * cfg.dy });
        const right = (n) => ({ x: n * cfg.rx, y: n * cfg.ry });
        const put = (t, f, r) => {
            const fVec = forward(f);
            const rVec = right(r);
            add(t, cfg.kx + fVec.x + rVec.x, cfg.ky + fVec.y + rVec.y);
        };

        put('王', 0, 0);
        if (isLord) {
            put('后', 0, 1);
            put('象', 0, -1);
            put('马', 1, 0);
            put('车', 1, 1);
            put('车', 1, -1);
        } else {
            put('后', 0, 1);
            put('象', 0, -1);
            put('马', 1, 0);
        }
    }
}

// --- 渲染 ---
// 国际象棋 Unicode 符号映射
const WESTERN_PIECE_SYMBOLS = {
    '王': '♔',
    '后': '♕',
    '车': '♖',
    '象': '♗',
    '马': '♘'
};

function renderPieces() {
    const container = document.getElementById('pieces');
    container.innerHTML = '';
    gameState.pieces.forEach(p => {
        const el = document.createElement('div');
        el.className = `piece ${gameState.selectedPiece === p ? 'selected' : ''}`;
        el.style.left = `calc(${p.x} * var(--grid-size))`;
        el.style.top = `calc(${p.y} * var(--grid-size))`;

        const pData = PLAYERS_DATA[p.owner];
        el.style.color = pData.color;
        el.style.borderColor = pData.color;

        // 国际象棋用图标，中国象棋用汉字
        if (gameState.gameMode === 'western' && WESTERN_PIECE_SYMBOLS[p.type]) {
            el.innerText = WESTERN_PIECE_SYMBOLS[p.type];
            el.classList.add('western-piece');
        } else {
            el.innerText = p.type;
        }

        if (pData.isLord) {
            el.classList.add('lord');
        }

        el.onclick = (e) => { e.stopPropagation(); handlePieceClick(p); };
        container.appendChild(el);
    });
}

// --- 交互 ---
function handlePieceClick(piece) {
    const currentPid = gameState.alivePlayers[gameState.currentPlayerIndex];
    if (piece.owner === currentPid) {
        gameState.selectedPiece = piece;
        renderPieces();
        showHints(piece);
    } else if (gameState.selectedPiece) {
        tryMove(gameState.selectedPiece, piece.x, piece.y);
    }
}

function showHints(piece) {
    const hints = document.getElementById('hints');
    hints.innerHTML = '';
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (canMove(piece, x, y)) {
                const h = document.createElement('div');
                h.className = 'hint';
                h.style.left = `calc(${x} * var(--grid-size))`;
                h.style.top = `calc(${y} * var(--grid-size))`;
                if (getPieceAt(x, y)) h.classList.add('capture');
                h.onclick = () => tryMove(piece, x, y);
                hints.appendChild(h);
            }
        }
    }
}

function tryMove(p, x, y) {
    if (!canMove(p, x, y)) return;
    saveState();

    const target = getPieceAt(x, y);
    p.x = x; p.y = y;

    if (target) {
        gameState.pieces = gameState.pieces.filter(item => item !== target);
        const kingTypes = ['将', '王'];
        if (kingTypes.includes(target.type)) {
            inheritTroops(p.owner, target.owner);
        }
    }

    gameState.selectedPiece = null;
    document.getElementById('hints').innerHTML = '';
    renderPieces();

    if (gameState.alivePlayers.length === 1) {
        setTimeout(() => alert(`游戏结束！${PLAYERS_DATA[gameState.alivePlayers[0]].name} 获胜！`), 100);
        return;
    }

    nextTurn();
}

// --- 规则判断 ---
function canMove(p, tx, ty) {
    if (p.x === tx && p.y === ty) return false;
    const target = getPieceAt(tx, ty);
    if (target && target.owner === p.owner) return false;

    const dx = tx - p.x;
    const dy = ty - p.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // 根据游戏模式选择规则
    if (gameState.gameMode === 'western') {
        return canMoveWestern(p, tx, ty, dx, dy, absDx, absDy, target);
    } else {
        return canMoveChinese(p, tx, ty, dx, dy, absDx, absDy, target);
    }
}

// 中国象棋规则
function canMoveChinese(p, tx, ty, dx, dy, absDx, absDy, target) {
    switch (p.type) {
        case '将': return (absDx + absDy === 1);
        case '士': return (absDx === 1 && absDy === 1);
        case '车':
            if (dx !== 0 && dy !== 0) return false;
            return countObstacles(p.x, p.y, tx, ty) === 0;
        case '炮':
            if (dx !== 0 && dy !== 0) return false;
            const obs = countObstacles(p.x, p.y, tx, ty);
            if (!target) return obs === 0;
            else return obs === 1;
        case '马':
            return canMoveHorseChinese(p, tx, ty);
    }
    return false;
}

// 中国象棋马的移动（带蹩脚+延伸）
function canMoveHorseChinese(p, tx, ty) {
    const horseDirs = [
        { x: 1, y: 2 }, { x: 1, y: -2 },
        { x: -1, y: 2 }, { x: -1, y: -2 },
        { x: 2, y: 1 }, { x: 2, y: -1 },
        { x: -2, y: 1 }, { x: -2, y: -1 }
    ];

    for (let dir of horseDirs) {
        let legX = p.x;
        let legY = p.y;

        if (Math.abs(dir.x) === 2) {
            legX += Math.sign(dir.x);
        } else {
            legY += Math.sign(dir.y);
        }

        if (getPieceAt(legX, legY)) continue;

        const maxStep = BOARD_SIZE === 16 ? 3 : 2;
        let step = 1;
        while (step <= maxStep) {
            const checkX = p.x + dir.x * step;
            const checkY = p.y + dir.y * step;

            if (checkX < 0 || checkX >= BOARD_SIZE || checkY < 0 || checkY >= BOARD_SIZE) break;
            if (checkX === tx && checkY === ty) return true;
            if (getPieceAt(checkX, checkY)) break;

            step++;
        }
    }
    return false;
}

// 国际象棋规则
function canMoveWestern(p, tx, ty, dx, dy, absDx, absDy, target) {
    switch (p.type) {
        case '王':
            return (absDx <= 1 && absDy <= 1);
        case '后':
            // 横竖斜都行
            if (dx === 0 || dy === 0) {
                return countObstacles(p.x, p.y, tx, ty) === 0;
            }
            if (absDx === absDy) {
                return countDiagonalObstacles(p.x, p.y, tx, ty) === 0;
            }
            return false;
        case '车':
            if (dx !== 0 && dy !== 0) return false;
            return countObstacles(p.x, p.y, tx, ty) === 0;
        case '象':
            if (absDx !== absDy) return false;
            return countDiagonalObstacles(p.x, p.y, tx, ty) === 0;
        case '马':
            // 国际象棋马：日字延伸，不蹩脚
            return canMoveHorseWestern(p, tx, ty);
    }
    return false;
}

// 国际象棋马的移动（无蹩脚+延伸）
function canMoveHorseWestern(p, tx, ty) {
    const horseDirs = [
        { x: 1, y: 2 }, { x: 1, y: -2 },
        { x: -1, y: 2 }, { x: -1, y: -2 },
        { x: 2, y: 1 }, { x: 2, y: -1 },
        { x: -2, y: 1 }, { x: -2, y: -1 }
    ];

    const maxStep = BOARD_SIZE === 16 ? 3 : 2;

    for (let dir of horseDirs) {
        let step = 1;
        while (step <= maxStep) {
            const checkX = p.x + dir.x * step;
            const checkY = p.y + dir.y * step;

            if (checkX < 0 || checkX >= BOARD_SIZE || checkY < 0 || checkY >= BOARD_SIZE) break;
            if (checkX === tx && checkY === ty) return true;
            if (getPieceAt(checkX, checkY)) break;

            step++;
        }
    }
    return false;
}

function countObstacles(x1, y1, x2, y2) {
    let count = 0;
    const xDir = Math.sign(x2 - x1);
    const yDir = Math.sign(y2 - y1);
    let cx = x1 + xDir;
    let cy = y1 + yDir;
    while (cx !== x2 || cy !== y2) {
        if (getPieceAt(cx, cy)) count++;
        cx += xDir;
        cy += yDir;
    }
    return count;
}

function countDiagonalObstacles(x1, y1, x2, y2) {
    let count = 0;
    const xDir = Math.sign(x2 - x1);
    const yDir = Math.sign(y2 - y1);
    let cx = x1 + xDir;
    let cy = y1 + yDir;
    while (cx !== x2 || cy !== y2) {
        if (getPieceAt(cx, cy)) count++;
        cx += xDir;
        cy += yDir;
    }
    return count;
}

function getPieceAt(x, y) {
    return gameState.pieces.find(p => p.x === x && p.y === y);
}

function inheritTroops(killerId, victimId) {
    const killer = PLAYERS_DATA[killerId];
    const victim = PLAYERS_DATA[victimId];

    let count = 0;
    gameState.pieces.forEach(p => {
        if (p.owner === victimId) {
            p.owner = killerId;
            count++;
        }
    });

    const victimIndex = gameState.alivePlayers.indexOf(victimId);
    gameState.alivePlayers = gameState.alivePlayers.filter(id => id !== victimId);

    if (victimIndex < gameState.currentPlayerIndex) {
        gameState.currentPlayerIndex--;
    }

    alert(`【斩首】${killer.name} 吞并了 ${victim.name} 的 ${count} 支部队！`);
}

function nextTurn() {
    gameState.currentPlayerIndex++;
    if (gameState.currentPlayerIndex >= gameState.alivePlayers.length) {
        gameState.currentPlayerIndex = 0;
    }
    updateStatus();
}

function updateStatus() {
    const pid = gameState.alivePlayers[gameState.currentPlayerIndex];
    const pData = PLAYERS_DATA[pid];
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = `当前回合: <span style="color:${pData.color}">${pData.name}</span>`;
    document.getElementById('board-container').style.borderColor = pData.color;
}