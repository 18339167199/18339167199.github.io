var Pic = document.getElementsByClassName("innerPic");
var Box = document.getElementById("Box");
var liList = document.getElementById("navUl");
var navList = liList.children;
var jiemian = [
    jiemian0 = document.getElementById("jiemian0"),
    jiemian1 = document.getElementById("jiemian1"),
    jiemian2 = document.getElementById("jiemian2"),
    jiemian3 = document.getElementById("jiemian3"),
    jiemian4 = document.getElementById("jiemian4")
];
var classificationList = document.getElementById("classification").children;
var timer;
var timer1;
var num = 0;
var num1 = 0;

window.onload = function (){
    init();
    function bindEvent (){
        //图片运动动画绑定
        var offLeft = Box.offsetLeft;
        Box.style.left = offLeft + 50 +"px";
        clearInterval(timer);
        timer = this.setInterval(function (){
            Pic[num].classList.add("addanimation");
            num ++;
            if(num == Pic.lenght){
                clearInterval(timer);
            }
        },250);

        //页面切换
        for(var i = 0; i < navList.length; i ++){
            (function (n){
                navList[n].children[0].onclick = function (){
                    for(var j = 0; j < navList.length; j ++){
                        jiemian[j].style.display = "none";
                    }
                    jiemian[n].style.display = "block";
                }
            }(i))
        }

        //鼠标移入字体显示
        for(var i = 0; i < classificationList.length; i++){
            (function (n){
                classificationList[n].onmouseover = function (){
                    classificationList[n].children[0].children[1].style.display = "block";
                }

                classificationList[n].onmouseout = function (){
                    classificationList[n].children[0].children[1].style.display = "none";
                }
            }(i))
        }

        //渐隐动画
        timer1 = this.setInterval(function (){
            classificationList[num1].classList.add("addanima");
            num1 ++;
            if(num1 == classificationList.lenght){
                clearInterval(timer);
            }
        },500);
    }

    function getArrminIndex (arr){
        var len = arr.length;
        var min = arr[0];
        var index = 0;
        for(var i = 1;i < len; i++){
            if(arr[i] < min){
                min = arr[i];
                index = i;
            }
        }
        return index;
    }

    //瀑布流布局
    function pubu (){
        var Width = classificationList[0].offsetWidth;//343
        var cols = parseInt((document.body.clientWidth - document.body.clientWidth*0.2) / Width);
        var arr = [];
        for(var i = 0; i < cols; i++){
            arr.push(classificationList[i].offsetHeight);
        }
        
        for(var j = 0; j < classificationList.length; j++){
            if(j < cols){
                classificationList[j].style.left = j*Width + "px";
                classificationList[j].style.top = 0 + "px";
            }
            var minIndex = getArrminIndex(arr);
            classificationList[j].style.left = minIndex*Width + "px";
            classificationList[j].style.top = arr[minIndex] + "px";
            arr[minIndex] = arr[minIndex] + classificationList[j].offsetHeight;
        }

    }

    function init(){
        bindEvent();
        pubu();
        for(var i = 1;i < navList.length; i++){
            jiemian[i].style.display = "none";
        }
    }
    
}