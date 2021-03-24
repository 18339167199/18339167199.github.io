var forIE = require('lib/for-ie');

// 3D轮播图
function ThreeDCarousel(props) {
  this.init();
  for (var prop in props) {
    this[prop] = props[prop];
  };
  this.getEle();
  if (!this.el) {
    return null;
  }
  this.setEle();
  this.layout();
  this.indicator();
  if (this.autoplay) {
    this.play();
  };
};
ThreeDCarousel.prototype.init = function () {
  this.animate = false;
  this.timer = null;
  this.autoplay = true;
  this.hoverToShop = false;
  this.offsetX = 400;
  this.offsetZ = 100;
};
ThreeDCarousel.prototype.getEle = function () {
  var type = this.el[0];
  if (type === '.') {
    this.el = document.getElementsByClassName(this.el.substr(1))[0];
  } else if (type === '#') {
    this.el = document.getElementById(this.el.substr(1));
  } else {
    throw new Error('No element is founed');
  };
  if(!this.el) {
    return null;
  }
  if (this.el.getAttribute('data-render') === 'true') {
    this.el = null;
  } else {
    this.el.setAttribute('data-render', 'true');
  }
  return this.el;
};
ThreeDCarousel.prototype.setEle = function () {
  var _this = this;

  this.items = this.el.getElementsByClassName('jw-carousel-inner')[0].children;
  this.len = this.items.length;
  this.items[this.index - 1].classList.add('active');

  if (this.hoverToShop) {
    this.el.addEventListener('mouseenter', function () {
      clearInterval(_this.timer);
    }, false);
    this.el.addEventListener('mouseleave', function () {
      if (_this.autoplay) {
        _this.play();
      }
    }, false);
  };

  var _this = this;
  function item_click() {
    if (this.index === _this.index) {
      return;
    }

    clearInterval(_this.timer);
    _this.index = this.index;
    _this.layout();

    for (var i = 0; i < _this.len; i ++) {
      _this.indicatorBox.children[i].classList.remove('active');
    }
    _this.indicatorBox.children[_this.index - 1].classList.add('active');

    if (_this.autoplay) {
      _this.play();
    }
  };

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].index = i + 1;
    this.items[i].addEventListener('click', item_click.bind(this.items[i]), false);
  }

  if (this.duration !== 250) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style.transition = 'all ' + this.duration / 1000 + 's';
    }
  }

  var itemH = 0;
  for (var i = 0; i < this.items.length; i ++) {
    if (this.items[i].classList.contains('active')) {
      itemH = this.items[i].offsetHeight;
      break;
    }
  }
  this.items[0].parentNode.style.height = itemH + 75 + 'px';
};
// 布局
ThreeDCarousel.prototype.layout = function () {
  // 根据 当前 index 来布局

  // 左边和右边各有多少个 item
  var num = Math.floor(this.len / 2);

  if (!/%/.test(this.offsetX)) {
    this.offsetX = Number(this.offsetX);
  }

  if (!/%/.test(this.offsetZ)) {
    this.offsetZ = Number(this.offsetZ);
  }

  // 布局左边
  var boundary = this.index - 1;
  for (var i = 0; i < num; i++) {
    boundary = boundary - 1;
    var now_layout = boundary;
    if (now_layout < 0) {
      now_layout = this.len + now_layout;
    }
    this.items[now_layout].style.transform = 'translateX(-' + this.offsetX * (i + 1) + 'px) translateZ(-' + this.offsetZ * (i + 1) + 'px)';
    if (forIE.isIE() && forIE.IEVersion() <= 9) {
      this.items[now_layout].setAttribute('style', 'transform: translateX(-' + this.offsetX * (i + 1) + 'px)');
    }
    
  }

  // 布局右边
  boundary = this.index - 1;
  for (var i = 0; i < num; i++) {
    boundary = boundary + 1;
    var now_layout = boundary;
    if (now_layout >= this.len) {
      now_layout = now_layout - this.len;
    }

    this.items[now_layout].style.transform = 'translateX(' + this.offsetX * (i + 1) + 'px) translateZ(-' + this.offsetZ * (i + 1) + 'px)';
    if (forIE.isIE() && forIE.IEVersion() <= 9) {
      this.items[now_layout].setAttribute('style', 'transform: translateX(' + this.offsetX * (i + 1) + 'px)');
    }
  }

  for (var i = 0; i < this.len; i++) {
    this.items[i].classList.remove('active');
  }
  this.items[this.index - 1].classList.add('active');
  this.items[this.index - 1].setAttribute('style', '');
};
// 创建指示器
ThreeDCarousel.prototype.indicator = function () {
  var indicatorBox = document.createElement('ul');
  indicatorBox.classList.add('jw-carousel-indicators');

  var innerHTML = '';

  for (var i = 0; i < this.len; i++) {
    if (i === (this.index - 1)) {
      innerHTML += '<li class="active" data-slide-to="' + i + '"></li>';
    } else {
      innerHTML += '<li data-slide-to="' + i + '"></li>';
    }
  }

  indicatorBox.innerHTML = innerHTML;
  this.indicatorBox = indicatorBox;
  this.el.appendChild(indicatorBox);

  // 指示器点击方法
  function click(e) {
    // 清除定时器
    clearInterval(this.timer);
    e = window.event || e;
    var target = e.target || e.srcElement;
    var slideTo = target.getAttribute('data-slide-to');

    if (Number(slideTo) + 1 === this.index || !slideTo) {
      return;
    }

    this.indicatorBox.children[this.index - 1].classList.remove('active');
    this.index = Number(slideTo) + 1;
    this.indicatorBox.children[this.index - 1].classList.add('active');
    this.layout();

    if (this.autoplay) {
      this.play();
    }
  }

  this.indicatorBox.addEventListener('click', click.bind(this), false);
}
// 播放
ThreeDCarousel.prototype.play = function () {
  var _this = this;
  this.timer = setInterval(function () {
    _this.indicatorBox.children[_this.index - 1].classList.remove('active');
    if (_this.direction === 'right') {
      _this.index++;
      if (_this.index > _this.len) {
        _this.index = 1;
      }
    } else {
      _this.index--;
      if (_this.index < 1) {
        _this.index = this.len;
      }
    }
    _this.indicatorBox.children[_this.index - 1].classList.add('active');
    _this.layout();

  }, this.interval);
};

module.exports = ThreeDCarousel;