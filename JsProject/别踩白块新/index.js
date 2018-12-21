var main = document.getElementById('main');
var go = document.getElementById('go');
var speed = 5, num = 0, timer, flag = true;
var colors = ['red', 'green', 'black', 'blue'];

function cDiv() {
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.setAttribute('class', 'row');
    for (var j = 0; j < 4; j++) {
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    for (var i = 0; i < 4; i++) {
        if (i == index) {
            var clickDiv = main.childNodes[0].childNodes[index];
            clickDiv.setAttribute('class', 'i');
            clickDiv.style.backgroundColor = colors[index];
        }
    }
}

function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        if (parseInt(main.offsetTop) >= 0) {
            cDiv();
            main.style.top = '-150px';
        }
        var len = main.childNodes.length;
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].children[i].classList.contains('i')) {
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20)
    bindEvent();
}

function bindEvent() {
    main.addEventListener('click', function (event) {
        if (flag) {
            var tar = event.target;
            if (tar.className == 'i') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('i');
                num++;
            } else {
                alert('游戏结束，得分：' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}

function clickStart() {
    go.addEventListener('click', function () {
        go.style.display = 'none';
        move();
    });
}
clickStart();