// ===== PLAYER =====
let player = {
    x: 200,
    y: 200,
    size: 20,
    speed: 3
};

let hearts = 5;
let invincible = false;

let arrows = 5;

let shieldActive = false;
let shieldDurability = 3;

// ===== ENEMY =====
let enemy = {
    x: 400,
    y: 200,
    size: 25,
    speed: 1.2,
    health: 3,
    dead: false,
    deathTimer: 0,
    active: true
};

// ===== DUNGEON =====
let hasKey = false;
let doorLocked = true;

let keys = {};

// ===== CONTROLS =====
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (e.key === "Shift") shieldActive = true;

    if (e.key === " ") attackSword();
    if (e.key === "f") shootArrow();
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
    if (e.key === "Shift") shieldActive = false;
});

// ===== SWORD =====
function attackSword() {
    if (!enemy.active || enemy.dead) return;

    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 40) {
        enemy.health--;

        if (enemy.health <= 0) {
            enemy.dead = true;
            enemy.deathTimer = 30;
            hasKey = true;
        }
    }
}

// ===== BOW =====
function shootArrow() {
    if (arrows <= 0) return;

    arrows--;

    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150 && enemy.active && !enemy.dead) {
        enemy.health--;

        if (enemy.health <= 0) {
            enemy.dead = true;
            enemy.deathTimer = 30;
            hasKey = true;
        }
    }
}

// ===== DAMAGE =====
function damagePlayer() {
    if (invincible) return;

    if (shieldActive) {
        shieldDurability--;

        if (shieldDurability <= 0) {
            shieldActive = false;
        }

        return;
    }

    hearts--;

    // Knockback
    let force = 20;
    if (player.x < enemy.x) player.x -= force;
    else player.x += force;

    if (player.y < enemy.y) player.y -= force;
    else player.y += force;

    if (hearts <= 0) {
        hearts = 0;
        document.body.innerHTML = `
            <div style="color:white;text-align:center;margin-top:40vh;font-size:40px;">
                GAME OVER
                <br><br>
                <button onclick="location.reload()" style="font-size:20px;">
                    Retry
                </button>
            </div>
        `;
        return;
    }

    invincible = true;
    setTimeout(() => invincible = false, 1000);
}

// ===== UPDATE =====
function update() {

    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;

    // Enemy movement
    if (enemy.active && !enemy.dead) {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        enemy.x += (dx / dist) * enemy.speed;
        enemy.y += (dy / dist) * enemy.speed;

        if (dist < 25) damagePlayer();
    }

    // Enemy death animation
    if (enemy.dead) {
        enemy.deathTimer--;
        enemy.size -= 0.5;

        if (enemy.deathTimer <= 0) {
            enemy.active = false;
        }
    }

    // Door check
    if (!doorLocked) return;

    if (hasKey && player.x > 750) {
        doorLocked = false;
        alert("Dungeon Cleared!");
    }
}

// ===== DRAW =====
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Enemy
    if (enemy.active) {
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }

    // Door
    ctx.fillStyle = doorLocked ? "brown" : "gray";
    ctx.fillRect(760, 200, 30, 100);

    // UI
    ctx.fillStyle = "white";
    ctx.fillText("Hearts: " + hearts, 20, 20);
    ctx.fillText("Arrows: " + arrows, 20, 40);
    ctx.fillText("Shield HP: " + shieldDurability, 20, 60);
}

// ===== GAME LOOP =====
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
