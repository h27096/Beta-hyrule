// ================================
// BETA HYRULE ENGINE v1 - CORE
// 640x480 | 32x32 Tiles
// ================================

// ----- CANVAS SETUP -----
const canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 480;
const ctx = canvas.getContext("2d");

// ----- TILE SETTINGS -----
const TILE = 32;
const COLS = canvas.width / TILE;   // 20
const ROWS = canvas.height / TILE;  // 15

// ----- GAME STATE -----
let currentRoom = "town";
let gameOver = false;

// ----- INPUT -----
let keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});
document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

// ----- SPRITE SHEET (TEMP PIXEL STYLE) -----
const sprites = {
    player: "#2ecc71",
    enemy: "#e74c3c",
    wall: "#555",
    floor: "#222",
    doorLocked: "#8e44ad",
    doorOpen: "#27ae60",
    npc: "#3498db",
    chest: "#f1c40f",
    key: "#f39c12",
    bigKey: "#e67e22",
    boss: "#c0392b",
    save: "#95a5a6"
};

// ----- PLAYER -----
let player = {
    x: 5 * TILE,
    y: 7 * TILE,
    width: TILE,
    height: TILE,
    speed: 3,
    direction: "down",
    hearts: 5,
    arrows: 5,
    shieldDurability: 3,
    invincible: false,
    hasKey: false,
    hasBigKey: false
};

// ----- SIMPLE ROOMS -----
const rooms = {

    town: {
        type: "overworld",
        layout: [
            "####################",
            "#..................#",
            "#........N.........#",
            "#..................#",
            "#......C...........#",
            "#..................#",
            "#..................#",
            "#.........S........#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..............D...#",
            "####################"
        ]
    },

    dungeon1: {
        type: "dungeon",
        layout: [
            "####################",
            "#..................#",
            "#..................#",
            "#..................#",
            "#.........E........#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#.........L........#",
            "####################"
        ]
    }

};

// ----- HELPER FUNCTIONS -----
function tileAt(x, y) {
    const col = Math.floor(x / TILE);
    const row = Math.floor(y / TILE);
    return rooms[currentRoom].layout[row][col];
}

function isWall(x, y) {
    return tileAt(x, y) === "#";
}

// ================================
// END PART 1
// ================================

// ================================
// PART 2 - RENDER + MOVEMENT
// ================================

// ----- DRAW MAP -----
function drawRoom() {
    const layout = rooms[currentRoom].layout;

    for (let row = 0; row < rooms[currentRoom].layout.length; row++) { 
        for (let col = 0; col < rooms[currentRoom].layout[row].length; col++) {
            
            const tile = layout[row][col];
            const x = col * TILE;
            const y = row * TILE;

            if (tile === "#") {
                ctx.fillStyle = sprites.wall;
            } else {
                ctx.fillStyle = sprites.floor;
            }

            ctx.fillRect(x, y, TILE, TILE);

            // Special tiles
            if (tile === "N") { // NPC
                ctx.fillStyle = sprites.npc;
                ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
            }

            if (tile === "C") { // Chest
                ctx.fillStyle = sprites.chest;
                ctx.fillRect(x + 6, y + 6, TILE - 12, TILE - 12);
            }

            if (tile === "S") { // Save
                ctx.fillStyle = sprites.save;
                ctx.fillRect(x + 6, y + 6, TILE - 12, TILE - 12);
            }

            if (tile === "D") { // Dungeon entrance
                ctx.fillStyle = sprites.doorLocked;
                ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
            }

            if (tile === "E") { // Enemy spawn
                ctx.fillStyle = sprites.enemy;
                ctx.fillRect(x + 6, y + 6, TILE - 12, TILE - 12);
            }

            if (tile === "L") { // Locked door
                ctx.fillStyle = player.hasKey ? sprites.doorOpen : sprites.doorLocked;
                ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
            }
        }
    }
}

// ----- DRAW PLAYER -----
function drawPlayer() {
    ctx.fillStyle = sprites.player;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// ----- MOVEMENT -----
function movePlayer() {

    let newX = player.x;
    let newY = player.y;

    if (keys["ArrowUp"]) {
        newY -= player.speed;
        player.direction = "up";
    }
    if (keys["ArrowDown"]) {
        newY += player.speed;
        player.direction = "down";
    }
    if (keys["ArrowLeft"]) {
        newX -= player.speed;
        player.direction = "left";
    }
    if (keys["ArrowRight"]) {
        newX += player.speed;
        player.direction = "right";
    }

    // Collision check (corners)
    if (!isWall(newX, player.y) &&
        !isWall(newX + player.width - 1, player.y) &&
        !isWall(newX, player.y + player.height - 1) &&
        !isWall(newX + player.width - 1, player.y + player.height - 1)) {
        player.x = newX;
    }

    if (!isWall(player.x, newY) &&
        !isWall(player.x + player.width - 1, newY) &&
        !isWall(player.x, newY + player.height - 1) &&
        !isWall(player.x + player.width - 1, newY + player.height - 1)) {
        player.y = newY;
    }
}

// ----- ROOM TRANSITIONS -----
function checkRoomTransition() {

    const tile = tileAt(player.x + TILE/2, player.y + TILE/2);

    if (currentRoom === "town" && tile === "D") {
        currentRoom = "dungeon1";
        player.x = 2 * TILE;
        player.y = 7 * TILE;
    }

    if (currentRoom === "dungeon1" && tile === "L" && player.hasKey) {
        alert("Dungeon Door Unlocked!");
    }
}

// ----- GAME LOOP -----
function update() {
    if (gameOver) return;

    movePlayer();
    checkRoomTransition();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoom();
    drawPlayer();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// ================================
// END PART 2
// ================================
