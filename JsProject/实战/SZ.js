var Pic = document.getElementsByClassName("innerPic");
var Box = document.getElementById("Box");
var timer;
var num = 0;

window.onload = function (){
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
    
}