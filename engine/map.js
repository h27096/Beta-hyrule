const mapWidth = 20;
const mapHeight = 15;

function drawMap(ctx){

ctx.fillStyle = "#2e8b57";

for(let y = 0; y < mapHeight; y++){

for(let x = 0; x < mapWidth; x++){

ctx.fillRect(
x * 32,
y * 32,
32,
32
);

}

}

}
