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
