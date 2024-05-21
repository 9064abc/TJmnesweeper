var cvs = document.getElementById("minesweeper");
var context　= cvs.getContext("2d");
context.fillStyle = "blue";
context.fillRect(0,0,440,440);
var base = new Image();
var ground = new Image();
var flag = new Image();
//flag.src = "logo_url";
base.src = "base.png";
ground.src = "ground.png";
function ondown(event){
  
}
function onup(event){
  
}
cvs.addEventListner("mousedown",ondown,false);
cvs.addEventListner("mouseup",onup,false);
function draw(){
    var cvs = document.getElementById("minesweeper");
    var context　= cvs.getContext("2d");
    context.drawImage(base,40,40);
    context.drawImage(ground,40,80);
}
function reset(){
    draw();
}
reset();
