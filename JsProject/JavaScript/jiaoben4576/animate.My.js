/**
 * Created by Xnew on 2016/8/25.
 */
//animate 动画
//    step 步长
// 目标位置
function animate(obj, target){
    clearInterval(obj.timer);
    var step = obj.offsetLeft < target ? +10 : -10;
    obj.timer = setInterval(function(){
        obj.style.left = obj.offsetLeft + step + "px";
        //console.log(Math.abs(target - obj.offsetLeft));
        if(Math.abs(target - obj.offsetLeft) <= 10){
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 10)
}