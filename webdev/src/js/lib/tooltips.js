var forIE = require("lib/for-ie");

// 提示框组件
function Tooltips(props) {
  this.init();
  for (var prop in props) {
    this[prop] = props[prop]
  };
  this.getEle();
  if (!this.el) {
    return null;
  }
  this.popup();
};
Tooltips.prototype.init = function () {
  this.el = '';
};
Tooltips.prototype.getEle = function () {
  // 没传入 el 默认获取class为 jw-tooltips 的元素
  if (this.el === '') {
    this.el = document.getElementsByClassName('jw-tooltips');
    this.len = this.el.length || 1;
    return;
  }

  // 根据 el 去获取元素
  var type = this.el[0];
  if (type === '.') {
    this.el = document.getElementsByClassName(this.el.substr(1))[0];
  } else if (type === '#') {
    this.el = document.getElementById(this.el.substr(1));
  } else {
    throw new Error('No element is founed');
  }
  this.len = this.el.length || 1;
};
Tooltips.prototype.createTips = function (content, placement, title) {
  var popover = document.createElement('div'),
    popover_arrow = document.createElement('div'),
    popover_content = document.createElement('div');

  popover.classList.add('popover');
  popover.classList.add(placement);

  popover_arrow.classList.add('arrow');
  popover.appendChild(popover_arrow);

  if (title !== '') {
    var popover_title = document.createElement('h3');
    popover_title.classList.add('popover-title');
    popover_title.innerHTML = title;
    popover.appendChild(popover_title)
  }

  popover_content.classList.add('popover-content');
  popover_content.innerHTML = content;
  popover.appendChild(popover_content);

  return popover;
};
Tooltips.prototype.popup = function () {
  var _this = this;

  function show(e) {
    e = event || window.event;
    target = e.target || e.srcElement;
    // 点到 popover 部分不做操作
    if (target.classList.contains('arrow') || target.classList.contains('popover-title') || target.classList.contains('popover-content')) {
      return false;
    }

    // 如果已经存在 popover 了，就不生成 popover，把现有的关闭
    if (this.getElementsByClassName('popover').length !== 0) {
      unshow.call(this);
      return;
    }
    var content = this.getAttribute('data-content'),
      title = this.getAttribute('data-title'),
      placement = this.getAttribute('data-placement');

    if (title === null) {
      title = '';
    }

    var tips = _this.createTips(content, placement, title);
    this.appendChild(tips);

    var tipsH = tips.offsetHeight,
      tipsW = tips.offsetWidth,
      elH = this.offsetHeight,
      elW = this.offsetWidth,
      offset = 11;

    if (placement === 'top') {
      tips.style.top = -(tipsH + offset) + 'px';
      tips.style.left = -(Math.abs(elW - tipsW)) / 2 + 'px';
    } else if (placement === 'left') {
      tips.style.left = -(tipsW + offset) + 'px';
      tips.style.top = -(Math.abs(elH - tipsH)) / 2 + 'px';
    } else if (placement === 'right') {
      tips.style.right = -(tipsW + offset) + 'px';
      tips.style.top = -(Math.abs(elH - tipsH)) / 2 + 'px';
    } else { //bottom
      tips.style.bottom = -(tipsH + offset) + 'px';
      tips.style.left = -(Math.abs(elW - tipsW)) / 2 + 'px';
    }
  }

  function unshow() {
    var popover = this.getElementsByClassName('popover');
    for (var i = 0; i < popover.length; i++) {
      this.removeChild(popover[i]);
    }
  }

  if (this.el.length) {
    for (var i = 0; i < this.el.length; i++) {
      var toggle = this.el[i].getAttribute('data-toggle');

      if (toggle === 'click') {
        this.el[i].addEventListener('click', show.bind(this.el[i]), false);
      } else {
        this.el[i].addEventListener('mouseenter',function() {
          if (!/(Android)|(iPhone)/.test(window.navigator.userAgent)) {
            show.call(this);
          }
        }, false);
        this.el[i].addEventListener('mouseleave', unshow.bind(this.el[i]), false);
        this.el[i].addEventListener('touchend', show.bind(this.el[i]), false);
      }
    }
  } else {
    var toggle = this.el.getAttribute('data-toggle'),
      trigger = (toggle === 'click' ? 'click' : 'mouseenter');
    this.el.addEventListener(trigger, show.bind(this.el), false);
    if (trigger === 'mouseenter') {
      this.el.addEventListener('mouseleave', unshow.bind(this.el), false);
    }
  }
};

module.exports = Tooltips;