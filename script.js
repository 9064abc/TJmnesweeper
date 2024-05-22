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
var width = 12;
var height = 9;
var length = 40;
var i,j,x,y;
var board;
function ondown(event){
    var status;
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
    i = x % length;
    j = y % length;
    status = board[i][j];
}
function onup(event){
    
}
cvs.addEventListener("mousedown",ondown,false);
cvs.addEventListener("mouseup",onup,false);
function draw(){
    cvs = document.getElementById("minesweeper");
    context　= cvs.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0,0,length*(width+2),length*(height*2));
    for(i=1;i<height;i++){
        for(j=1;j<width;j++){
            if(board[i][j] == 0){
                context.drawImage(base,length*(i+1),length*(j+1));
            }
            else if(board[i][j] == 1){
                context.drawImage(ground,length*(i+1),length*(j+1));
            }
        }
    }
}
function reset(){
    board = Array(height+2).fill().map(() => Array(width+2).fill(0));
    for(i=0;i<height+2;i++){
        board[i][0] = 10;
        board[i][width+1] = 10;
    }
    for(i=0;i<width+2;i++){
        board[0][i] = 10;
        board[height+1][i] = 10;
    }
    draw();
}
base.onload = function(){reset();}
