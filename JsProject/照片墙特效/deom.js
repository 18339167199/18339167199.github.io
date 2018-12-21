var imgList = document.getElementsByTagName("img");
var len = imgList.length;
var btn = document.getElementById("btn");
var timer1,timer2;
var flag = true;

function event(){
    if(flag = true){
        flag = false;
        for(var i = 0; i <len; i++){
            (function (i){
                setTimeout(function (){
                    imgList[i].style.transition = "1s";
                    imgList[i].style.transform = "scale(0)";
                    imgList[i].style.opacity = 0;
    
                    setTimeout(function(){
                        imgList[i].style.transform = "scale(1)";
                        imgList[i].style.opacity = 1;
    
                        setTimeout(function(){
                            imgList[i].classList.add("ani");
                            if(i == len-1){
                                flag = true
                            }
                        },Math.random()*1500 + 3000)
                    },Math.random()*1500 + 1500)
                },Math.random()*1500)
            }(i))
        }
    }
}

function init (){
    for(var i = 0; i <len; i++){
        imgList[i].classList.remove("ani");
    }
}

btn.onclick = function (){
    init();
    event();
}