var imgList = $("img"),
    Box = $('.Pic'),
    speed = 10,
    len = imgList.length;

var cloudBox = $('#cloud');

var snowBox  = $('.sonw');
let timer,timer1,timer2;
var nowplay = 0;

init();
function init(){
     layout(nowplay);
     move(); 
     snow();
     makeCloud();
}

function makeCloud (){
    timer2 = setInterval(function (){
        var cloudDiv = document.createElement("div");
        var time;
        cloudDiv.style.position = 'absolute';
        cloudDiv.style.height = 200 + 'px';
        cloudDiv.style.width = 400 + 'px';
        cloudDiv.style.opacity = 0.9;
        cloudDiv.style.zIndex = 999;
        cloudDiv.style.backgroundImage = 'url(images/yun.png)';
        cloudDiv.style.backgroundSize = '100% 100%';
        cloudDiv.style.top = 0;
        cloudDiv.style.left = -400 + 'px';
        cloudBox.append(cloudDiv);
        time = setInterval(function(){
            cloudDiv.style.left = cloudDiv.offsetLeft + 5 + 'px';
            if(cloudDiv.offsetLeft >= document.body.clientWidth - 50){
                cloudDiv.remove();
                clearInterval(time);
            }
        },Math.random()*200)
    },2000)
}

function snow (){
    timer1 = setInterval(function (){
        var snowDiv = document.createElement('div');
        var size = Math.random();
        snowDiv.num = 1;
        snowDiv.direction = Math.random;
        snowDiv.s = Math.random()*3;
        snowDiv.style.width = size*100 + 'px';
        snowDiv.style.height = size*100 + 'px';
        snowDiv.style.opacity = Math.random();
        snowDiv.style.backgroundImage = 'url(images/xuehua.png)';
        snowDiv.style.backgroundSize = '100% 100%';
        snowDiv.style.position = 'absolute';
        snowDiv.style.left = Math.random()*(document.body.clientWidth-100)+ 'px';
        var time = setInterval(function(){
            snowDiv.style.top = snowDiv.offsetTop + 5 +'px';//下坠
            snowDiv.style.transform = 'rotateZ(' + (snowDiv.num++)*5 + 'deg)';//旋转
            if(snowDiv.offsetLeft >= (document.body.clientWidth)){//飘动
                clearInterval(time);
                snowDiv.remove();
            }else{
                if(snowDiv.direction > 0.7){
                    snowDiv.style.left = (snowDiv.offsetLeft - snowDiv.s) + 'px';
                }else{
                    snowDiv.style.left = snowDiv.offsetLeft + snowDiv.s + 'px';
                }
            }
            if(snowDiv.offsetTop >= 880){
                clearInterval(time);
                snowDiv.remove();
            }
        },50)
        snowBox.append(snowDiv);
    },400)
}

function layout (n){
    var Lnum,Rnum,Last;
    if((n-1) < 0){
        Lnum = len - 1;
    }else{
        Lnum = n - 1;
    }
    if((n+1) > (len-1)){
        Rnum = 0;
    }else{
        Rnum = n + 1;
    }
    if((n+2) <= (len-1)){
        Last = n+2;
    }else{
        Last = n-2;
    }
    imgList.eq(n).css({
        transform : 'translateZ(200px)'
    });

    imgList.eq(Lnum).css({
        transform : 'translateX(120px) translateY(20px) rotateY(90deg)'
    });

    imgList.eq(Rnum).css({
        transform : 'translateX(-100px) translateY(20px) rotateY(-90deg)'
    })

    imgList.eq(Last).css({
        transform : 'translateZ(-200px)'
    })
}

function move (){
    timer = setInterval(function(){
        nowplay++;
        if(nowplay == 4){
            nowplay = 0;
        }
        layout(nowplay);
    },2000)
}