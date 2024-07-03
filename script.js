var cvs = document.getElementById("minesweeper");
var rbutton = document.getElementById("reset");
var context　= cvs.getContext("2d");


var base = new Image();
var ground = new Image();
var flag = new Image();
//minelogo.src = "logo_url";
base.src = "base.png";
ground.src = "ground.png";
flag.src = "flag.png";

var width = 12;
var height = 9;
var mine,mineNum,Flag,Mine;
var length = 40;
var game_status = 1;  //1:続行中　0:clear　-1:game over
var long_press = 0;  
var interval_id;
var i,j,x,y,h,w,c,count,l,tmp,texttmp;
var board;
var textcolor = ["#B8B6B6","#0000ff","#008000","#ff0000","#191970","#822222","#008080","#555555","#9400d3"]
function makeP(S){
    var p = document.querySelector("#num");
    //var p = document.createElement("p");
    p.textContent = S;
    //el.appendChild(p);
}
function judge(){
    for(h=1;h<height+1;h++){
        for(w=1;w<width+1;w++){
            if(mine[h][w] == -1 && board[h][w] < 0){
                return false;
            }
            else if(mine[h][w] != Flag[h][w]){
                return false;
            }
        }
    } 
    return true;
}
function countmine(h,w){
    for(i=-1;i<2;i++){
        for(j=-1;j<2;j++){
            if(Flag[h+i][w+j] == 1){
                count += 1;
            }
        }
    }
    if(board[h][w] == count+1){
        return true;
    }
    return false;
}
function open(h,w){
    //tmp = [[h,w]];
    //tmp.forEach(function(i){
    var k,l
    if(board[h][w] == 1){
        for(k=-1;k<2;k++){
            for(l=-1;l<2;l++){
                if(board[h+k][w+l] < 0 && Flag[h+k][w+l] < 0){
                    if(mine[h+k][w+l] == 1){
                        game_status = -1;
                        var statusE = document.getElementById("status");
                        statusE.textContent += "  Game Over";
                    }else{
                        board[h+k][w+l] = Math.abs(board[h+k][w+l]);
                        open(h+k,w+l);
                    }
                }
            }
        }
    }
}
function place_flag(){
    
    long_press = true;
    if(board[h][w] < 0){
        Flag[h][w] *= -1;
        
        if(Flag[h][w] == 1){
            mineNum -= 1;
            makeP(mineNum.toString());
        }else{
            mineNum += 1;
            makeP(Flag[h][w].toString);
        }
        //makeP(mineNum.toString());
        draw();
    }
}
function ondown(event){
    var status;
    x = event.pageX - cvs.offsetLeft;
    y = event.pageY - cvs.offsetTop;
    w = Math.floor(x / length);
    h = Math.floor(y / length);
    status = board[h][w];
    long_press = false;
    count = 0;
    texttmp = 'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();

    
    interval_id = setTimeout(function(){place_flag();},400);
    this.addEventListener("pointerup",onup,false);
    //this.addEventListener("touchend",onup,false);
}
function onup(event){
    //clearInterval(interval_id);
    clearTimeout(interval_id);
    if(long_press == false){
        if(Flag[h][w]<0 && game_status==1){
            
            if(c == 0){
                Mine.splice((h-1)*width + w - 1,1);
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
                //tmp = mine;
                mine = Array(height+2).fill().map(() => Array(width+2).fill(-1));
                for(i=0;i<mineNum;i++){
                    mine[Mine[i][0]][Mine[i][1]] = 1;
                }
                for(i=1;i<height+1;i++){  //周囲の地雷の数
                    for(j=1;j<width+1;j++){
                        c = 0;
                        for(h=-1;h<2;h++){
                            for(w=-1;w<2;w++){
                                if(mine[i+h][j+w] == 1){
                                    c += 1;
                                }
                            }
                        }
                        board[i][j] *= (c+1);
                    }
                }
                c += 1;
                w = Math.floor(x / length);
                h = Math.floor(y / length);
            }
            board[h][w] = Math.abs(board[h][w]);
            if(countmine(h,w) && game_status==1){
                for(k=-1;k<2;k++){
                    for(l=-1;l<2;l++){
                        if(board[h+k][w+l] < 0 && Flag[h+k][w+l] < 0){
                            if(mine[h+k][w+l] == 1){
                                game_status = -1;
                                var statusE = document.getElementById("status");
                                statusE.textContent += "  Game Over";
                            }else{
                                board[h+k][w+l] = Math.abs(board[h+k][w+l]);
                                open(h+k,w+l);
                            }
                        }
                    }
                }
                
            }
            if(mine[h][w] == 1){
                game_status = -1;
                texttmp += "  Game Over";
            }
        }
        else if(game_status == -1){
            texttmp += "  Game Over";
        }else{
            texttmp += "  CLEAR";
        }
        var statusE = document.getElementById("status");
        statusE.textContent = texttmp;   //'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();
        draw();
    }
}


cvs.addEventListener("pointerdown",ondown,false);
//cvs.addEventListener("touchstart",ondown,false);


function draw(){
    context.clearRect(0,0,cvs.width,cvs.height);
    context.fillStyle = "black";
    context.fillRect(0,0,length*(width+2),length*(height*2));

    
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = (length-4).toString() + "px Arial";
    for(i=1;i<height+1;i++){
        for(j=1;j<width+1;j++){
            if(board[i][j] < 0){
                context.drawImage(base,length*(j),length*(i));
            }
            else if(board[i][j] > 0){
                context.drawImage(ground,length*(j),length*(i));
                context.fillStyle = textcolor[board[i][j]-1];
                context.fillText((board[i][j]-1).toString(),length*j+length/2,length*i+length/2+3);
            }
            if(Flag[i][j] == 1){
                context.drawImage(flag,length*j+4,length*i+4);
            }
        }
    }
    if(c!=0 && judge()){
        game_status == 0;
        var statusE = document.getElementById("status");
        statusE.textContent += "  CLEAR";
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
    makeP(mine.value);
    mineNum = Number(mine.value);
    cvs.height = length*(height+2);
    cvs.width = length*(width+2);
    board = Array(height+2).fill().map(() => Array(width+2).fill(-1));
    Flag = Array(height+2).fill().map(() => Array(width+2).fill(-1));

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
                Mine.push([i,j]);
        }
    }
    //makeP(mineNum.toString());
    draw();
}


flag.onload = function(){reset();}
rbutton.addEventListener("click",reset);
