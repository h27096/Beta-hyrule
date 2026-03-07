const player={
x:9,
y:6,
health:5,
arrows:10
};

function movePlayer(){

if(keys["ArrowUp"])player.y--;
if(keys["ArrowDown"])player.y++;
if(keys["ArrowLeft"])player.x--;
if(keys["ArrowRight"])player.x++;

}

function drawPlayer(ctx){

ctx.fillStyle="green";

ctx.fillRect(
player.x*32,
player.y*32,
32,
32
);

}
