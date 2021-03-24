var forIE = require("lib/for-ie");

// 所有的轮播图对象都会 push 到该数组
var carouselArray = [];

// 是否已经添加监听
var isAddEventListener = false;

// 轮播图组件
// 配置参数 props
/*
{
  el: '#carousel', //挂载元素*
  height: 500, //高度 默认：500px
  width: '100%', //宽度 默认：'100%'
  autoplay: true, //是否自动播放 默认：true
  interval: 2000, //轮播时间 默认：5000
  index: 1, //初始所在的位置 默认：1
  duration: 500, //动画过渡时间 默认：1000
  direction: 'right', //播放的方向 默认：'right'
  hoverToStop: false //鼠标移入停止播放 默认：true
}
*/
function Carousel(props) {
  // 初始化参数
  this.init();
  for (var prop in props) {
    this[prop] = props[prop];
  }
  // 记录初始的状态播放状态
  this.initStatus = this.autoplay;
  this.now = this.index;
  // 获取轮播图元素
  this.getEle(this.el);
  if (!this.el) {
    return null;
  }
  // 初始化样式
  this.initStyle();
  // 获取轮播图的内容区
  this.getInner();
  // 获取轮播图的指示器
  this.getIndicators();
  // 构建按钮
  this.constructBtn();
  // 播放轮播
  if (this.autoplay) {
    this.play()
  }
  this.done();
};

// 初始化参数设置
Carousel.prototype.init = function () {
  this.id = carouselArray.length ? carouselArray + 1 : 1;
  this.height = 500;
  this.width = "100%";
  this.autoplay = true;
  this.initStatus = this.autoplay;
  this.interval = 5000;
  this.index = 1;
  this.playInterval = null;
  this.duration = 1000;
  this.onAnimate = false;
  this.direction = 'right';
  this.now = this.index;
  this.callback = '';
  this.createIndicators = true;
  this.indicators = '';
  this.indicatorsToggle = 'click';
};

// 完成初始化
Carousel.prototype.done = function() {
  if(isAddEventListener === false) {
    window.addEventListener('blur', function () {
      for (var i = 0; i < carouselArray.length; i++) {
        carouselArray[i].stopPlay();
      }
    }, false);
    window.addEventListener('focus', function () {
      for (var i = 0; i < carouselArray.length; i++) {
        if (carouselArray[i].initStatus) {
          carouselArray[i].play();
        }
      }
    });
    isAddEventListener = true;
  }
};

// 初始化宽高设置
Carousel.prototype.initStyle = function () {
  if (this.height) {
    this.el.style.height = (/%/.test(this.height) ? this.height : this.height + 'px');
  }
  if (this.width) {
    this.el.style.width = (/%/.test(this.width) ? this.width : this.width + 'px');
  }
};

// 获取轮播图元素
Carousel.prototype.getEle = function (selector) {
  var type = selector[0],
    _this = this;
  if (type === '.') {
    this.el = document.getElementsByClassName(selector.substr(1))[0];
  } else if (type === '#') {
    this.el = document.getElementById(selector.substr(1));
  } else {
    throw new Error('No element is founed');
  }
  if(!this.el) {
    return null;
  }
  if (this.el.getAttribute('data-render') === 'true') {
    this.el = null;
    return null;
  } else {
    this.el.setAttribute('data-render', 'true');
  }
  this.el.style.width = /%/.test(this.width) ? this.width : this.width + 'px';
  if (this.hoverToStop) {
    this.el.addEventListener('mouseenter', function () {
      _this.stopPlay();
    }, false)
    this.el.addEventListener('mouseleave', function () {
      if (_this.autoplay) {
        _this.play();
      }
    }, false)
  }
  return this.el;
};

// 获取轮播图内容盒子
Carousel.prototype.getInner = function () {
  var inner = this.el.getElementsByClassName('jw-carousel-inner')[0];
  var _this = this;
  var items = inner.children;

  items[this.index - 1].classList.add('active');
  function transitionEnd() {
    this.inner.style.transition = '';
    for (var i = 0; i < this.len; i++) {
      this.innerItems[i].classList.remove('active');
    }
    this.innerItems[this.index - 1].classList.remove('left');
    this.innerItems[this.index - 1].classList.remove('right');
    this.innerItems[this.index - 1].classList.add('active');
    this.inner.style.left = '-100%';
    if (this.callback !== '' && typeof this.callback === 'function') {
      this.callback();
    }
    this.onAnimate = false;
  }
  inner.addEventListener('webkitTransitionEnd', transitionEnd.bind(this));

  // 手机滑动
  var img = inner.querySelectorAll("img");
  if (img.length) {
    for (var i = 0; i < img.length; i ++) {
      img[i].ondragstart = function () { return false; }
    }
  }
  for (var i = 0; i < items.length; i ++) {
    items[i].addEventListener('touchstart', function (e) {
      if (_this.onAnimate) {
        return;
      }
      var pos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
      function mobileSlide(startPos, e) {
        e = window.event || e;
        var endPos = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        };
        var direction = (endPos.x - startPos.x > 0 ? 'left' : 'right');
        if (Math.abs(endPos.x - startPos.x) > 80) {
          direction === 'left' ? _this.prevBtn.onclick() : _this.nextBtn.onclick();
        }

        this.removeEventListener('touchend', mobileSlide, false);
      };
      this.addEventListener('touchend', mobileSlide.bind(this, pos), false);
    }, false);
  }

  this.inner = inner;
  this.innerItems = items;
  this.activeItem = items[this.index - 1];
  this.len = items.length;
};

// 获取轮播图指示器
Carousel.prototype.getIndicators = function () {
  var indicatorsbox = null;
  var _this = this;
  if (this.createIndicators) {
    indicatorsbox = document.createElement('ol');
    for (var i = 0; i < this.len; i++) {
      var li = document.createElement('li');
      li.setAttribute('data-slide-to', i + 1);
      indicatorsbox.appendChild(li);
    };
    this.el.appendChild(indicatorsbox);
  } else {
    if (this.indicators[0] === '.') {
      indicatorsbox = document.getElementsByClassName(this.indicators.substr(1))[0];
    } else {
      indicatorsbox = document.getElementById(this.indicators.substr(1));
    }

    var liList = indicatorsbox.children;
    for (var i = 0; i < this.len; i ++) {
      liList[i].setAttribute('data-slide-to', i + 1);
    }
  }
  
  indicatorsbox.classList.add('jw-carousel-indicators');
  var indicators = indicatorsbox.children;

  // 指示器触发事件
  function indicatorsClick(e) {
    if (this.getAttribute('data-slide-to') === null || this.getAttribute('data-slide-to') === undefined || _this.onAnimate) {
      return;
    }
    clearInterval(_this.playInterval);
    var now = _this.index;
    _this.index = this.getAttribute('data-slide-to');
    if (now === _this.index) {
      return;
    }
    _this.loop(now, _this.index > now ? 'right' : 'left');
    if (_this.autoplay && _this.initStatus) {
      _this.play();
    }
  }
  
  var toggle = (this.indicatorsToggle === 'click' ? 'click' : 'mouseenter');
  for (var i = 0; i < this.len; i ++) {
    indicators[i].addEventListener(toggle, indicatorsClick.bind(indicators[i]), false);
  }
  // indicatorsbox.onclick = indicatorsboxClick.bind(this);

  indicators[this.index - 1].classList.add('active');
  this.indicators = indicatorsbox;
  this.indicatorItems = indicators;
  this.activeIndicator = indicators[this.index - 1];
};

// 构建前进和后退按钮
Carousel.prototype.constructBtn = function () {
  var prevBtn = document.createElement('a'),
    prevSpan = document.createElement('span'),
    nextBtn = document.createElement('a'),
    nextSpan = document.createElement('span'),
    _this = this;

  prevBtn.classList.add('prev');
  prevBtn.classList.add('btn');
  prevBtn.href = 'javascript:void(0)';
  prevBtn.direction = 'left';
  prevBtn.appendChild(prevSpan);
  nextBtn.classList.add('next');
  nextBtn.classList.add('btn');
  nextBtn.href = 'javascript:void(0)';
  nextBtn.direction = 'right';
  nextBtn.appendChild(nextSpan);

  function click() {
    if (_this.onAnimate) {
      return;
    }
    clearInterval(_this.playInterval);
    _this.animate.call(_this, this.direction);
    if (_this.autoplay) {
      _this.play();
    }
  }

  prevBtn.onclick = click;
  nextBtn.onclick = click;

  this.el.appendChild(prevBtn);
  this.el.appendChild(nextBtn);
  this.nextBtn = nextBtn;
  this.prevBtn = prevBtn;
  carouselArray.push(this);
};

// 改变当前的index
Carousel.prototype.move = function (now, type) {
  if (type === 'right') { //向右运动
    if (now < this.len) {
      now++;
    } else {
      now = 1;
    }
  } else if (type === 'left') { //向左运动
    if (now > 1) {
      now--;
    } else {
      now = this.len;
    }
  } else {
    throw new Error('direction param wrong!!')
  }

  this.activeIndicator = this.indicatorItems[now - 1];
  this.activeItem = this.innerItems[now - 1];
  return now
};

// 轮播逻辑
Carousel.prototype.loop = function (now, direction) {
  // now 是现在的 carousel-item
  // this.index 下一个 carousel-item
  this.onAnimate = true;
  this.inner.style.transition = 'all ' + this.duration / 1000 + 's';

  if (direction === 'right') {
    this.innerItems[this.index - 1].classList.add('right');
    this.inner.style.left = '-200%';
  } else { //left
    this.innerItems[this.index - 1].classList.add('left');
    this.inner.style.left = "0%";
  }
  this.indicatorItems[now - 1].classList.remove('active');
  this.indicatorItems[this.index - 1].classList.add('active');

  // 兼容ie9
  if (forIE.isIE()) {
    if (forIE.IEVersion() < 10) {
      function recover() {
        this.onAnimate = false;
        this.inner.style.transition = '';
        for (var i = 0; i < this.len; i++) {
          this.innerItems[i].classList.remove('active');
        }
        this.innerItems[this.index - 1].classList.remove('left');
        this.innerItems[this.index - 1].classList.remove('right');
        this.innerItems[this.index - 1].classList.add('active');
        this.inner.style.left = '-100%';
        if (this.callback !== '' && typeof this.callback === 'function') {
          this.callback();
        }
      }
      setTimeout(recover.bind(this), this.duration);
    };
  }
};

// 循环一次
Carousel.prototype.animate = function (direction) {
  // 记录当前的 index
  this.now = this.index;
  // 先改变 index
  this.index = this.move(this.now, direction);
  // 再根据 now 和 index 做运动
  this.loop(this.now, direction);
};

// 播放
Carousel.prototype.play = function () {
  var _this = this;
  this.autoplay = true;
  clearInterval(this.playInterval);
  this.playInterval = setInterval(function () {
    _this.animate.call(_this, _this.direction);
  }, this.interval);
};

// 停止播放
Carousel.prototype.stopPlay = function () {
  // this.autoplay = false;
  clearInterval(this.playInterval);
};

module.exports = Carousel;