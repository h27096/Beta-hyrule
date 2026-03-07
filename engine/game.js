const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=640;
canvas.height=480;

function update(){

movePlayer();

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawMap(ctx);

drawPlayer(ctx);

ctx.fillStyle="white";
ctx.font="16px Arial";
ctx.fillText("Health: "+player.health,10,20);
ctx.fillText("Arrows: "+player.arrows,10,40);

}

function loop(){

update();
draw();

requestAnimationFrame(loop);

}

loop();
