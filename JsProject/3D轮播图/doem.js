var $Box = $(".wrapper");
var imgList = $("img");
var len = imgList.length;
var nowplay = 0;
var nowP = 0;
var timer;
var flag = false;

init();
setIndex();
function init(){
    autoplay();
    picSet();
    bindEvent();
}

function picSet(){
    var hLen = Math.floor(len / 2);
    var lNum, rNum;
    for (var i = 0; i < hLen; i++) {
        lNum = nowplay - i - 1;
        imgList.eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        })
        rNum = nowplay + i + 1;
        if (rNum > len - 1) {
            rNum -= len;
        }
        imgList.eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
        imgList.removeClass('on');
    }
    imgList.eq(nowplay).css({
        transform: 'translateZ(300px)'
    }).addClass('on');
    $Box.on('transitionend', function () {
        flag = true;
    }) 
}

function setIndex(){
    for(var i = 0; i < len ; i++){
        imgList[i].index = i;
    }
}

function autoplay(){
    timer = setInterval(function (){
        if(nowP == len -1){
            nowP = 0;
        }else{
            nowP++;
        }
        moving(nowP);
    },3000);
}

function moving(index){
    nowplay = index;
    picSet();
}

function bindEvent(){
    imgList.on('click',function (e){
        if(!$(this).hasClass('on')){
            e = e||window.event;
            nowP = e.target.index;
            moving(nowP);
            clearInterval(timer);
        }
    }).hover(function (e){
        clearInterval(timer);
    },function (e){
        autoplay();
    })
}