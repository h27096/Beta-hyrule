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

  if(keys["ArrowUp"]){
    player.y--;
    player.dir = 3;
  }

  if(keys["ArrowDown"]){
    player.y++;
    player.dir = 0;
  }

  if(keys["ArrowLeft"]){
    player.x--;
    player.dir = 1;
  }

  if(keys["ArrowRight"]){
    player.x++;
    player.dir = 2;
  }

}

function drawPlayer(ctx){

  ctx.drawImage(
    linkSprite,
    0,
    player.dir * 32,
    32,
    32,
    player.x * 32,
    player.y * 32,
    32,
    32
  );

}
