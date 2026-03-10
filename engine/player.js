const player = {
  x: 9,
  y: 6,
  health: 5,
  arrows: 10,
  dir: 0
};

const linkSprite = new Image();
linkSprite.src = "assets/sprites/link.png";

function movePlayer(){

  let moveCooldown = 0;

function movePlayer(){

if(moveCooldown > 0){
moveCooldown--;
return;
}

if(keys["ArrowUp"]){
player.y--;
player.dir = 3;
moveCooldown = 8;
}

if(keys["ArrowDown"]){
player.y++;
player.dir = 0;
moveCooldown = 8;
}

if(keys["ArrowLeft"]){
player.x--;
player.dir = 1;
moveCooldown = 8;
}

if(keys["ArrowRight"]){
player.x++;
player.dir = 2;
moveCooldown = 8;
}

}

function drawPlayer(ctx){

ctx.fillStyle = "red";

ctx.fillRect(
player.x * 32,
player.y * 32,
32,
32
);

}
