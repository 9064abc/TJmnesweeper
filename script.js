var cvs = document.getElementById("minesweeper");
var rbutton = document.getElementById("reset");
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
var mine,Flag,Mine;
var length = 40;
var game_status = 0;
var i,j,x,y,h,w,c,l,tmp,texttmp;
var board;


function ondown(event){
    var status;
    x = event.clientX - cvs.offsetLeft;
    y = event.clientY - cvs.offsetTop;
    w = Math.floor(x / length);
    h = Math.floor(y / length);
    status = board[h][w];
    //var statusE = document.getElementById("status");
    texttmp = 'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();

    
    if(board[h][w]<0 && game_status==1){
        if(c == 0){ 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//地雷生成
            //Flag = [...Array((width+2)*(height+2)).map(_,i) => i];
            Mine.splice((h-1)*width + w - 1,1);
            //delete Mine[(h-1)*width + w - 1];
            l = Mine.length;
            tmp = [0,0];
            for(i=0;i<l;i++){
                var random = Math.floor(Math.random()*l);
                tmp[0] = Mine[i][0];
                tmp[1] = Mine[i][1];
                Mine[i][0] = Mine[random][0];
                Mine[i][1] =Mine[random][1];
                Mine[random][0] = tmp[0];
                Mine[random][1] = tmp[1];
            }
            tmp = mine;
            mine = Array(height+2).fill().map(() => Array(width+2).fill(-1));;
            for(i=0;i<tmp;i++){
                mine[Mine[i][0]][Mine[i][1]] = 1;
            }
            c += 1;
        }

        
        board[h][w] = 1;
        if(mine[h][w] == 1){
            game_status = 0;
            texttmp += "  Game Over";
        }
        draw();
    }
    else if(game_status == 0){
        texttmp += "  Game Over";
    }
    var statusE = document.getElementById("status");
    statusE.textContent = texttmp;   //'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();
}
function onup(event){
    if(board[h][w] != 10){
        return 0;
    }
}


cvs.addEventListener("mousedown",ondown,false);
cvs.addEventListener("mouseup",onup,false);


function draw(){
    //cvs = document.getElementById("minesweeper");
    context.clearRect(0,0,cvs.width,cvs.height);
    //context　= cvs.getContext("2d");
    context.fillStyle = "black";
    //width = document.getElementById("width");
    //height = document.getElementById("height");
    //mine = document.getElementById("mine");
    //w = Number(width.value);
    //h = Number(height.value);
    context.fillRect(0,0,length*(width+2),length*(height*2));
    for(i=1;i<height+1;i++){
        for(j=1;j<width+1;j++){
            if(board[i][j] == -1){
                context.drawImage(base,length*(j),length*(i));
            }
            else if(board[i][j] == 1){
                context.drawImage(ground,length*(j),length*(i));
            }
        }
    }
}
function reset(){
    game_status = 1;
    c = 0;

    
    width = document.getElementById("width");
    height = document.getElementById("height");
    mine = document.getElementById("mine");
    if(Number(width.value)<1){
        width.value = "9";
    }
    if(Number(height.value)<1){
        height.value = "9";
    }
    width = Number(width.value);
    height = Number(height.value);
    if(Number(mine.value)<1 || Number(mine.value)>Math.floor(width*height/2)){
        mine.value = Math.floor(width*height/5).toString();
    }
    mine = Number(mine.value);
    cvs.height = length*(height+2);
    cvs.width = length*(width+2);
    board = Array(height+2).fill().map(() => Array(width+2).fill(-1));


    for(i=0;i<height+2;i++){
        board[i][0] = 10;
        board[i][width+1] = 10;
    }
    for(i=0;i<width+2;i++){
        board[0][i] = 10;
        board[height+1][i] = 10;
    }

    
    Mine = [];
    for(i=1;i<height+1;i++){
        for(j=1;j<width+1;j++){
                Mine.push([i,j])
        }
    }
    draw();
}


base.onload = function(){reset();}
rbutton.addEventListener("click",reset);
