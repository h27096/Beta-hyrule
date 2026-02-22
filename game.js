document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, { passive: false });
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

const tileSize = 32;

let player = {
  x: 5,
  y: 5
};

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  if (keys["ArrowUp"]) player.y--;
  if (keys["ArrowDown"]) player.y++;
  if (keys["ArrowLeft"]) player.x--;
  if (keys["ArrowRight"]) player.x++;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Touch button controls
document.getElementById("up").addEventListener("touchstart", () => player.y--);
document.getElementById("down").addEventListener("touchstart", () => player.y++);
document.getElementById("left").addEventListener("touchstart", () => player.x--);
document.getElementById("right").addEventListener("touchstart", () => player.x++);

function bindButton(id, keyName) {
  const btn = document.getElementById(id);

  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keys[keyName] = true;
  });

  btn.addEventListener("touchend", () => {
    keys[keyName] = false;
  });

  btn.addEventListener("mousedown", () => {
    keys[keyName] = true;
  });

  btn.addEventListener("mouseup", () => {
    keys[keyName] = false;
  });
}

bindButton("up", "ArrowUp");
bindButton("down", "ArrowDown");
bindButton("left", "ArrowLeft");
bindButton("right", "ArrowRight");
