let imgList = $("img");
let len = imgList.length;
let row = 4;
let widthArr = [];
let Heigth = 200;

for(var i = 0; i < row; i++){
    widthArr.push(0);
}

init();
setIndex();
function layout (){
    var num = 0;
    for(var i = 0; i < len; i++){
        num = i % row;
        imgList.eq(i).css({
            top : num * Heigth + "px",
            left : widthArr[num]
        })

        widthArr[num] += imgList[i].offsetWidth;
    }
}

function setIndex (){
    for(var i = 0; i < len; i++){
        imgList[i].index = i;
    }
}

function bintEvent (){
    imgList.on('mouseover',function(e){
        e = e||window.event;
        var touchImg = e.target;
        for(var i = 0; i < len; i++){
            if(i == touchImg.index){
                continue;
            }else{
                imgList[i].classList.add('touch');
            }
        }
    })

    imgList.on('mouseout',function(){
        for(var i = 0; i < len; i++){
            imgList[i].classList.remove('touch');
        }
    })
}

function init (){
    layout();
    bintEvent();
}