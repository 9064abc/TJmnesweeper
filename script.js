var cvs = document.getElementById("minesweeper");
var context　= cvs.getContext("2d");
//context.fillStyle = "blue";
//context.fillRect(0,0,440,440);
var base = new Image();
var ground = new Image();
var flag = new Image();
//flag.src = "logo_url";
base.src = "base.png";
ground.src = "ground.png";
var rbutton = document.getElementById("reset");

var width = 12;
var height = 9;
var mine;
var length = 40;
var i,j,x,y,h,w,c;
var board;
function ondown(event){
    var status;
    if(c == 0){
        
    }
    x = event.clientX - cvs.offsetLeft;
    y = event.clientY - cvs.offsetTop;
    w = Math.floor(x / length);
    h = Math.floor(y / length);
    status = board[h][w];
    var statusE = document.getElementById("status");
    statusE.textContent = 'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();
}
function onup(event){
    if(board[h][w] != 10){
        board[h][w] = 1;
        draw();
    }
}
cvs.addEventListener("mousedown",ondown,false);
cvs.addEventListener("mouseup",onup,false);
function draw(){
    cvs = document.getElementById("minesweeper");
    context　= cvs.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0,0,length*(width+2),length*(height*2));
    for(i=1;i<height+1;i++){
        for(j=1;j<width+1;j++){
            if(board[i][j] == 0){
                context.drawImage(base,length*(j),length*(i));
            }
            else if(board[i][j] == 1){
                context.drawImage(ground,length*(j),length*(i));
            }
        }
    }
}
function reset(){
    width = document.getElementById("width");
    height = document.getElementById("height");
    mine = document.getElementById("mine");
    width = Number(width.value);
    height = Number(height.value);
    mine = Number(mine.value);
    cvs.height = length*(height+2);
    cvs.width = length*(width+2);
    board = Array(height+2).fill().map(() => Array(width+2).fill(0));
    c = 0;
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
rbutton.addEventListener("click",reset);
