window.onload = function (){
    var box =  document.getElementById("box");
    var smallPic = document.getElementsByClassName("small_pic")[0];//左侧小图
    var slider = document.getElementsByClassName("slider")[0];
    var bigPic = document.getElementsByClassName("big_pic")[0];
    var bigPicImg = bigPic.children[0];

    smallPic.onmousemove = function (event){
        slider.style.display = "block";
        bigPic.style.display = "block";
        var left = event.clientX - slider.offsetWidth/2;
        var top = event.clientY - slider.offsetHeight/2;
        if(left < 0){
            left = 0;
        }
        if(left >= 250){
            left = 250;
        }
        if(top < 0){
            top = 0;
        }
        if(top >= 250){
            top = 250;
        }
        slider.style.left = left + "px";
        slider.style.top = top + "px";
        bigPicImg.style.left = -(left*2) + "px";
        bigPicImg.style.top = -(top*2) + "px";
        
    }

    smallPic.onmouseout = function (){
        slider.style.display = "none";
        bigPic.style.display = "none";
    }
}