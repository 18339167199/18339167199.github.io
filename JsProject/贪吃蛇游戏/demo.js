//点击开始游戏，startPage消失 游戏开始
// 随机出现食物,出现3节蛇
//上下左右改变方向
//判断是否吃到食物   食物消失 蛇+1
//判断游戏结束 弹出结束框；

var gameBtn = document.getElementById('startP');//暂停 开始按钮
var startBtn = document.getElementById('start');//游戏开始按钮
var startPage = document.getElementById('startPage');//开始界面;
var close = document.getElementById('close');
var loseScore = document.getElementById('loserScore');
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var snakeMove; 
var speed = 200;
var startGameBool = true;
var startPaushBool = true;


init();
function init (){
     /*地图 */
     this.mapW = parseInt(getComputedStyle(content).width);
     this.mapH = parseInt(getComputedStyle(content).height);
     this.mapDiv = content;
     //食物
     this.foodW = 20;
     this.foodH = 20;
     this.foodX = 0;
     this.foodY = 0;
     //蛇
     this.snakeW = 20;
     this.snakeH = 20;
     this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
     //游戏属性
     this.direct = 'right';
     this.left = false;
     this.right = false;
     this.up = true;
     this.down = true;
     //分数
     this.score = 0;
}

function startGame (){
    startPage.style.display = "none";
    gameBtn.style.display = "block";
    food();
    snake();
    bindEvent();
}
/*食物的随机产生*/
function food(){
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class','food');
}
//蛇的产生
function snake (){
    for(var i=0;i < this.snakeBody.length;i++){
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 +'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
//移动
function move (){
    for(var i = this.snakeBody.length - 1;i > 0;i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];
    }

    switch(this.direct){
        case "right":
            this.snakeBody[0][0] += 1; break;
        case "up":
            this.snakeBody[0][1] -= 1; break;
        case "left":
            this.snakeBody[0][0] -= 1; break;
        case "down":
            this.snakeBody[0][1] += 1; break;
    }

    removeClass('snake');
    snake();
    //吃到食物的判断 （蛇身是否加1）
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
        var snakeEndX = this.snakeBody[this.snakeBody.length-1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length-1][1];
        switch(this.direct){
            case 'right':
                this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    //失败的判断
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20){
        reloadGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH/20){
        reloadGame();
    }
    //撞到自身的判断
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for(var i = 1;i < this.snakeBody.length; i++){
        if(snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]){
            reloadGame();
        }
    }
}
//结束处理
function reloadGame (){
    removeClass('sanke');
    removeClass('food');
    clearInterval(snakeMove);

    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    lose.style.display = "block";
    loseScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPaushBool = true;
    gameBtn.setAttribute('src','./img/KS.jpg');



    

}
//清除
function removeClass (className){
    var ele = document.getElementsByClassName(className);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDerict (code){
    switch(code){
        case 37:
            if(this.left){
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if(this.right){
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if(this.down){
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

//事件的绑定
startBtn.onclick = startAndPaush;
function bindEvent (){
    close.onclick = function (){
        lose.style.display = 'none';
    }
    gameBtn.onclick = function (){
        startAndPaush();
    }


}

function startAndPaush (){
    if(startPaushBool){
        if(startGameBool){
            startGame();
            startGameBool = false;
        }
        gameBtn.setAttribute('src','./img/ZT.jpg');
        document.onkeydown = function (e){
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval (function (){
            move();
        },speed);
        startPaushBool = false;
    }else{
        gameBtn.setAttribute('src','./img/KS.jpg');
        clearInterval(snakeMove);
        document.onkeydown = function (e){
           e.returnValue = false;
           return false;
        };
        startPaushBool = true;
    }
}

