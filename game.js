// --- 配置常量 ---
const BOARD_SIZE = 16;

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
    totalPlayers: 5
};
let moveHistory = [];

// --- 游戏流程 ---
function startGame() {
    const count = parseInt(document.getElementById('player-count').value);
    gameState.totalPlayers = count;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'flex';
    initBoard();
}
function saveState() {
    // 深拷贝当前状态并压入栈
    // 注意：我们要存 pieces, currentPlayerIndex, alivePlayers
    const snapshot = {
        pieces: JSON.parse(JSON.stringify(gameState.pieces)),
        currentPlayerIndex: gameState.currentPlayerIndex,
        alivePlayers: [...gameState.alivePlayers]
    };
    moveHistory.push(snapshot);

    // 限制历史记录长度防止内存溢出（可选，比如保留最近50步）
    if (moveHistory.length > 50) moveHistory.shift();
}

function undoMove() {
    if (moveHistory.length === 0) {
        alert("没有可以悔的棋了！");
        return;
    }

    // 弹出上一步状态
    const lastState = moveHistory.pop();

    // 恢复状态
    gameState.pieces = lastState.pieces;
    gameState.currentPlayerIndex = lastState.currentPlayerIndex;
    gameState.alivePlayers = lastState.alivePlayers;

    // 清理界面
    gameState.selectedPiece = null;
    document.getElementById('hints').innerHTML = '';

    // 重新渲染
    renderPieces();
    updateStatus();
}

function initBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }

    gameState.pieces = [];
    spawnPieces();

    // 激活存活玩家 (根据生成的棋子反推)
    const activeIds = new Set(gameState.pieces.map(p => p.owner));
    gameState.alivePlayers = Array.from(activeIds).sort((a, b) => a - b);

    gameState.currentPlayerIndex = 0; // 主公先手

    renderPieces();
    updateStatus();
}

// --- 核心布局算法 ---
function spawnPieces() {
    /**
     * 定义8个槽位 (Slot)
     * type: 'cardinal' (正向) 或 'corner' (角落)
     * kx, ky: "将" 的绝对坐标
     * dx, dy: 
     * 如果是 'cardinal': dx=前进方向, dy=右侧方向
     * 如果是 'corner': dx=X轴扩散方向(1或-1), dy=Y轴扩散方向(1或-1)
     */
    const slots = [
        // 0. 主公 (正上) - 面向下
        { id: 0, type: 'cardinal', kx: 7, ky: 0, dx: 0, dy: 1, rx: -1, ry: 0 },

        // 1. 左上角 (0,0) - 向右下扩散
        { id: 1, type: 'corner', kx: 0, ky: 0, dx: 1, dy: 1 },

        // 2. 正左 - 面向右
        { id: 2, type: 'cardinal', kx: 0, ky: 7, dx: 1, dy: 0, rx: 0, ry: 1 },

        // 3. 左下角 (0,15) - 向右上扩散
        { id: 3, type: 'corner', kx: 0, ky: 15, dx: 1, dy: -1 },

        // 4. 正下 - 面向上
        { id: 4, type: 'cardinal', kx: 8, ky: 15, dx: 0, dy: -1, rx: 1, ry: 0 },

        // 5. 右下角 (15,15) - 向左上扩散
        { id: 5, type: 'corner', kx: 15, ky: 15, dx: -1, dy: -1 },

        // 6. 正右 - 面向左
        { id: 6, type: 'cardinal', kx: 15, ky: 8, dx: -1, dy: 0, rx: 0, ry: -1 },

        // 7. 右上角 (15,0) - 向左下扩散
        { id: 7, type: 'corner', kx: 15, ky: 0, dx: -1, dy: 1 }
    ];

    // 根据人数选择槽位 (保持逆时针分布)
    let chosenIndices = [];
    switch (gameState.totalPlayers) {
        case 5: chosenIndices = [0, 2, 4, 6, 7]; break; // 上, 左, 下, 右, 右上
        case 6: chosenIndices = [0, 2, 3, 4, 6, 7]; break;
        case 7: chosenIndices = [0, 1, 2, 3, 4, 6, 7]; break;
        case 8: chosenIndices = [0, 1, 2, 3, 4, 5, 6, 7]; break;
        default: chosenIndices = [0, 2, 4, 6, 7];
    }

    chosenIndices.forEach((slotIdx, playerIndex) => {
        // playerIndex 是 0~7 的实际玩家ID (决定颜色和名字)
        // slotIdx 是位置ID
        createFormation(slots[slotIdx], playerIndex);
    });
}

function createFormation(cfg, pid) {
    const isLord = PLAYERS_DATA[pid].isLord;

    // 辅助：添加棋子
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

    if (cfg.type === 'corner') {
        // --- 角落布局 (L型铁桶阵) ---
        // cfg.kx, cfg.ky 是顶点 (将)
        // cfg.dx, cfg.dy 是延伸方向 (例如左上角是 1, 1)

        // 1. 将 (顶点)
        add('将', cfg.kx, cfg.ky);

        // 2. 士 (贴身保护: 横向1格, 纵向1格)
        add('士', cfg.kx + 1 * cfg.dx, cfg.ky);
        add('士', cfg.kx, cfg.ky + 1 * cfg.dy);

        // 3. 车 (外围墙壁: 横向2格, 纵向2格)
        add('车', cfg.kx + 2 * cfg.dx, cfg.ky);
        add('车', cfg.kx, cfg.ky + 2 * cfg.dy);

        // 4. 马 (L型内部拐角)
        add('马', cfg.kx + 1 * cfg.dx, cfg.ky + 1 * cfg.dy);

        // 5. 炮 (马的前方，构成火力点)
        add('炮', cfg.kx + 2 * cfg.dx, cfg.ky + 2 * cfg.dy);

    } else {
        // --- 正向布局 (扁平阵型) ---
        // cfg.kx, cfg.ky 是将
        // cfg.dx, cfg.dy 是前方
        // cfg.rx, cfg.ry 是右手边

        const forward = (n) => ({ x: n * cfg.dx, y: n * cfg.dy });
        const right = (n) => ({ x: n * cfg.rx, y: n * cfg.ry });

        // 放置函数: put(type, forwardSteps, rightSteps)
        const put = (t, f, r) => {
            const fVec = forward(f);
            const rVec = right(r);
            add(t, cfg.kx + fVec.x + rVec.x, cfg.ky + fVec.y + rVec.y);
        };

        put('将', 0, 0);

        if (isLord) {
            // 主公强力阵容
            put('士', 0, -1); put('士', 0, 1);
            put('马', 0, -2); put('马', 0, 2);
            put('车', 0, -3); put('车', 0, 3);

            // 第二排
            put('车', 1, 2); // 先锋车
            put('车', 1, -2); // 先锋车
            put('炮', 2, -2); put('炮', 2, 2); // 宽炮
            put('士', 1, 0); // 后卫士
        } else {
            // 普通正向诸侯
            put('士', 0, -1); put('士', 0, 1);
            put('车', 0, -2); put('车', 0, 2);
            // 前排
            put('马', 1, -1);
            put('炮', 1, 1);
        }
    }
}

// --- 渲染 ---
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
        el.innerText = p.type;

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

    // --- 关键点：在修改数据前先保存状态 ---
    saveState();

    const target = getPieceAt(x, y);
    p.x = x; p.y = y;

    if (target) {
        gameState.pieces = gameState.pieces.filter(item => item !== target);
        if (target.type === '将') {
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

// ==========================================
// 3. 更新：规则判断 (加入马的蹩脚检测)
// ==========================================

function canMove(p, tx, ty) {
    if (p.x === tx && p.y === ty) return false;
    const target = getPieceAt(tx, ty);
    if (target && target.owner === p.owner) return false;

    const dx = tx - p.x;
    const dy = ty - p.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

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
            // --- 超级马：蹩脚检测 + 无限延伸 ---
            const horseDirs = [
                { x: 1, y: 2 }, { x: 1, y: -2 },
                { x: -1, y: 2 }, { x: -1, y: -2 },
                { x: 2, y: 1 }, { x: 2, y: -1 },
                { x: -2, y: 1 }, { x: -2, y: -1 }
            ];

            for (let dir of horseDirs) {
                // 1. 蹩脚检测 (New!)
                // 规则：马走日，先直走一格，再斜走一格。
                // 蹩脚点在于“直走那一格”。
                // 如果是纵向日(1,2)，蹩脚点在(0,1)
                // 如果是横向日(2,1)，蹩脚点在(1,0)

                let legX = p.x;
                let legY = p.y;

                if (Math.abs(dir.x) === 2) {
                    legX += Math.sign(dir.x); // 横向蹩马腿位置
                } else {
                    legY += Math.sign(dir.y); // 纵向蹩马腿位置
                }

                // 如果马腿处有子，这个方向直接废掉，不能跳跃也不能延伸
                if (getPieceAt(legX, legY)) continue;

                // 2. 射线延伸检测 (同之前的逻辑)
                let step = 1;
                while (step <= 3) {
                    const checkX = p.x + dir.x * step;
                    const checkY = p.y + dir.y * step;

                    if (checkX < 0 || checkX >= BOARD_SIZE || checkY < 0 || checkY >= BOARD_SIZE) break;

                    // 发现目标在射线上
                    if (checkX === tx && checkY === ty) return true;

                    // 路径阻挡：虽然没蹩马腿，但滑行路上有别人挡着，也不能穿过去
                    if (getPieceAt(checkX, checkY)) break;

                    step++;
                }
            }
            return false;
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

    // 关键修正：为了防止行动顺序错乱
    // 我们需要先找到 victim 在 alivePlayers 里的索引
    const victimIndex = gameState.alivePlayers.indexOf(victimId);

    // 从存活列表移除
    gameState.alivePlayers = gameState.alivePlayers.filter(id => id !== victimId);

    // 如果被杀的人排在当前行动者之前，当前行动者索引需要减1，否则下一个人会被跳过
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

    // 视觉提示边框
    document.getElementById('board-container').style.border = `2px solid ${pData.color}`;
}