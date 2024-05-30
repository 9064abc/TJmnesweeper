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
flag.src = "flag.png";

var width = 12;
var height = 9;
var mine,Flag,Mine;
var length = 40;
var game_status = 0;
var long_press = 0;
var interval_id;
var i,j,x,y,h,w,c,count,l,tmp,texttmp;
var board;
var textcolor = ["#B8B6B6","#555555","#555555","#555555","#555555","#555555","#555555","#555555","#555555"]
function open(h,w){
    //tmp = [[h,w]];
    //tmp.forEach(function(i){
    var k,l
    if(board[h][w] == 1){
        for(k=-1;k<2;k++){
            for(l=-1;l<2;l++){
                if(board[h+k][w+l] < 0){
                    board[h+k][w+l] = Math.abs(board[h+k][w+l]);
                    open(h+k,w+l);
                    //tmp.push([i[0]+h,i[1]+w]);
                }
            }
        }
    }
    //});
    //board[tmp[0][0],tmp[0][1]] *= -1;
}
function press_length(count){
    this.addEventListener("mouseup",onup,{once: true});
    count += 1;
    if(count>50){
        long_press = 1;
        Flag[h][w] *= -1;
        draw();
    }else if(long_press == 1){
        return 0;
    }else{
        setTimeout(press_length(count),10);
    }
}
function ondown(event){
    var status;
    x = event.pageX - cvs.offsetLeft;
    y = event.pageY - cvs.offsetTop;
    w = Math.floor(x / length);
    h = Math.floor(y / length);
    status = board[h][w];
    long_press = 0;
    count = 0;
    //var statusE = document.getElementById("status");
    texttmp = 'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();
    //this.addEventListener("mouseup",onup,false);
    //interval_id = setInterval(() => {count+=1;if(count>50){long_press=1;Flag[h][w]*=-1;clearInterval(interval_id);}},10);
    //draw();
    press_length(0);
    /*if(board[h][w]<0 && game_status==1){
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
            mine = Array(height+2).fill().map(() => Array(width+2).fill(-1));
            for(i=0;i<tmp;i++){
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
        }
        w = Math.floor(x / length);
        h = Math.floor(y / length);
        
        board[h][w] *= -1;
        
        if(mine[h][w] == 1){
            game_status = 0;
            texttmp += "  Game Over";
        }
        else if(board[h][w] == 1){
            open(h,w);
        }
        draw();
    }
    else if(game_status != 0 && board[h][w] != 10){
        draw();
    }
    else if(game_status == 0){
        texttmp += "  Game Over";
    }
    var statusE = document.getElementById("status");
    statusE.textContent = texttmp;   //'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();*/
}
function onup(event){
    //clearInterval(interval_id);
    if(long_press == 0){
        long_press == 1;
        if(board[h][w]<0 && game_status==1){
            if(c == 0){
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
                mine = Array(height+2).fill().map(() => Array(width+2).fill(-1));
                for(i=0;i<tmp;i++){
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
            board[h][w] *= -1;
        
            if(mine[h][w] == 1){
                game_status = 0;
                texttmp += "  Game Over";
            }
            else if(board[h][w] == 1){
                open(h,w);
            }
            draw();
        }
        else if(game_status != 0 && board[h][w] != 10){
            draw();
        }
        else if(game_status == 0){
            texttmp += "  Game Over";
        }
        var statusE = document.getElementById("status");
        statusE.textContent = texttmp;   //'h:'+h.toString()+' j:'+w.toString()+' status:' + status.toString();
    }
}


cvs.addEventListener("mousedown",ondown,false);
//cvs.addEventListener("mouseup",onup,false);


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
            /*if(c!=0 && mine[i][j] == 1){
                context.drawImage(flag,length*(j)+4,length*(i)+4);
            }*/
            if(Flag[i][j] == 1){
                context.drawImage(flag,length*j+4,length*i+4);
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
    Flag = Array(height+2).fill().map(() => Array(width+2).fill(-1))

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


flag.onload = function(){reset();}
rbutton.addEventListener("click",reset);
