const keys = {};

function bindButton(id,key){

const btn = document.getElementById(id);

btn.addEventListener("touchstart",e=>{
e.preventDefault();
keys[key]=true;
});

btn.addEventListener("touchend",()=>{
keys[key]=false;
});

}

bindButton("up","ArrowUp");
bindButton("down","ArrowDown");
bindButton("left","ArrowLeft");
bindButton("right","ArrowRight");

document.getElementById("attack").addEventListener("touchstart",()=>{
keys["attack"]=true;
});

document.getElementById("shield").addEventListener("touchstart",()=>{
keys["shield"]=true;
});
