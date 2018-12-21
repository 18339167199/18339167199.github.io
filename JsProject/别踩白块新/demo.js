var main = $('#main'),
    go = $('#go'),
    speed = 5,
    num = 0,
    timer,
    flag = true,
    colors = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];

function cDiv() {
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4);
    oDiv.attr('class', 'row');
    for (var j = 0; j < 4; j++) {
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = oDiv.children()[index];
    $(clickDiv).css('backgroundColor', colors[index]);
    $(clickDiv).attr('class', 'i')
}

function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(main.css('top')) + speed;
        main.css('top', step + 'px');
        if (parseInt(main.css('top')) >= 0) {
            cDiv();
            main.css({
                'top': '-150px'
            })
        }
        var len = main.children().length;
        if (len == 6) {
            for (var i = 0; i < len; i++) {
                if ($(main.children()[len - 1].children[i]).hasClass('i')) {
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            $(main.children()[len - 1]).remove();
        }
    }, 20)
    bindEvent();
}

function bindEvent() {
    main.on('click', function (event) {
        if (flag) {
            var tar = event.target;
            if (tar.className == 'i') {
                $(tar).css('backgroundColor', '#bbb');
                $(tar).removeClass();
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
    $('a').on('click', function () {
        $('a').css('display', 'none');
        move();
    })
}
clickStart();