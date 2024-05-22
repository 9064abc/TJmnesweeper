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
var width = 12;
var height = 9;
var length = 40;
var i,j,x,y;
var board;
function ondown(event){
    var status;
    x = event.clientX - cvs.offsetLeft;
    y = event.clientY - cvs.offsetTop;
    i = Math.floor(x / length);
    j = Math.floor(y / length);
    status = board[i][j];
    var statusE = document.getElementById("status");
    statusE.textContent = 'i:'+i.toString()+' j:'+j.toString()+' status:' + status.toString();
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
                context.drawImage(base,length*(j),length*(i));
            }
            else if(board[i][j] == 1){
                context.drawImage(ground,length*(j),length*(i));
            }
        }
    }
}
function reset(){
    cvs.height = length*(height+2);
    cvs.width = length*(width+2);
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
