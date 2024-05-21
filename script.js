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
var width = 9;
var height = 9;
var i,j;
var board;
function ondown(event){
  
}
function onup(event){
  
}
cvs.addEventListener("mousedown",ondown,false);
cvs.addEventListener("mouseup",onup,false);
function draw(){
    var cvs = document.getElementById("minesweeper");
    var context　= cvs.getContext("2d");
    for(i=0;i<height;i++){
        for(j=0;j<width;j++)
            if(board[i][j] == 0){
                context.drawImage(base,40*(i+1),40*(j+1));
            }
            else if(board[i][j] == 1){
                context.drawImage(ground,40,80);
            }
    }
}
function reset(){
    board = Array(height).fill().map(() => Array(width).fill(0));
    draw();
}
base.onload = {reset()};
