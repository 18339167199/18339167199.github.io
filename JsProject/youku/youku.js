var upBackImgDiv = document.getElementById("upBackImgDiv");
var upBackImgNavDiv = document.getElementById("upBackImgNavImgDiv");
var imgliList = upBackImgDiv.children[0].children;
var imgNavliList = upBackImgNavDiv.children[0].children;
var timer;
var num = 1;

init();
function setIndex (){
    for(var i = 0; i < imgliList.length; i ++){
        imgliList[i].index = i;
        imgNavliList[i].index = i;
    }
}

function autoPlay (index){
    if(index > (imgliList.length-1)){
        index = index % (imgliList.length-1);
    }

    num = index;

    timer = setInterval(function (){
        for(var i = 0; i < imgliList.length ; i ++){
            imgliList[i].style.display = "none";
            imgNavliList[i].children[0].children[0].style.fontSize = "14px";
            imgNavliList[i].style.opacity = 0.6;
            imgNavliList[i].classList.remove("navliwhite_space");
        }

        imgNavliList[num].style.opacity = 1;
        imgNavliList[num].children[0].children[0].style.fontSize = "20px";
        imgliList[num].style.display = "block";
        imgNavliList[num].classList.add("navliwhite_space");

        num ++;
        if(num > imgliList.length-1){
            num = 0;
        }
    },3000)
}

function bindEvent (){
    for(var i = 0; i < imgNavliList.length; i ++){
        //鼠标移入事件绑定
        (function (n){
            imgNavliList[n].onmouseover = function (){
                clearInterval(timer);

                for(var i = 0; i < imgliList.length ; i ++){
                    imgliList[i].style.display = "none";
                    imgNavliList[i].children[0].children[0].style.fontSize = "14px";
                    imgNavliList[i].style.opacity = 0.6;
                    imgNavliList[i].classList.remove("navliwhite_space");
                }

                imgNavliList[n].style.opacity = 1;
                imgNavliList[n].children[0].children[0].style.fontSize = "20px";
                imgliList[n].style.display = "block";
                imgNavliList[n].classList.add("navliwhite_space");
            }
        }(i));

        //鼠标移出事件的绑定
        (function (n){
            imgNavliList[n].onmouseout = function (){
                autoPlay(n);
            }
        }(i));
    }
}

function init(){
    setIndex();
    bindEvent();

    imgNavliList[0].style.opacity = 1;
    imgNavliList[0].children[0].children[0].style.fontSize = "20px";
    imgliList[0].style.display = "block";
    imgNavliList[0].classList.add("navliwhite_space");

    autoPlay(num);
}