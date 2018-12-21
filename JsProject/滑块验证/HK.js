
    var btn = document.getElementsByClassName("btn")[0];
    var bg = document.getElementsByClassName("bg")[0];
    var text = document.getElementsByClassName("text")[0];
    var box = document.getElementsByClassName("wrapper")[0];
    var flag = false;

    btn.onmousedown = function (event){
        var e = event || e;
        var downX = e.clientX;
        btn.onmousemove = function (e){
            var moveX = e.clientX - downX;
            if(moveX > 0){
                btn.style.left = moveX + "px";
                bg.style.width = moveX + "px";

                if(moveX >= box.offsetWidth - btn.offsetWidth){
                    flag = true;
                    text.innerHTML = "通过验证";
                    text.style.color = "#fff";
                    btn.onmousedown = null;
                    btn.onmousemove = null;
                }
            }
        }
    }

    btn.onmouseup = function (e){
        btn.onmousemove = null;
        if(flag) return;
        this.style.left = 0;
        bg.style.width = 0;
    }
