/**
 * 运动函数直接写入 HTMElement 原型链
 * 使用:
 * var a = document.getElementsById("id");
 * a.fadeIn(duration, callback);
 * 
 * a.fadeOut(duration, callback);
 * 
 * a.animate({
 *   width: '200px',
 *   left: '400px',
 *   marginLeft: '200px'
 * }, duration, callback);
 */

/**
 * 支持带单位的的css属性 和 opacity
 */
HTMLElement.prototype.animate = function(targetJSON,duration,callback){
  var _this = this;

  function fetchComputedStyle(dom,property){
    // 正则替换大写字母， 例如 marginLeft -> margin-left
    if(window.getComputedStyle){
      property = property.replace(/[A-Z]/g, function(word){
        return "-" + word.toLowerCase();
      });
      return window.getComputedStyle(dom)[property];
    }else{
      //ie浏览器  margin-left -> marginLeft
      property = property.replace(/\-([a-z])/g, function(match, checked){
        return checked.toUpperCase();
      });
      return dom.currentStyle[property];
    }
  }

  var interval = 16;
  // 用于保存最终目标值
  var semophorJSON = {};
  for(var prop in targetJSON){
    semophorJSON[prop] = parseFloat(fetchComputedStyle(_this, prop));
  }
  var maxCount = duration / interval;
  var stepJSON = {};
  for(var prop in targetJSON){
    targetJSON[prop] = parseFloat(targetJSON[prop]);
    stepJSON[prop] = (targetJSON[prop] - semophorJSON[prop]) / maxCount;
  }
  var count = 0;
  var t1 = new Date();
  var timer = setInterval(function(){
    for(var prop in semophorJSON){
      semophorJSON[prop] += stepJSON[prop];
      if(prop != "opacity"){
        _this.style[prop] = semophorJSON[prop] + "px";
      }else{
        _this.style[prop] = semophorJSON[prop];
        _this.style.filter = "alpha(opacity = " + (semophorJSON[prop] * 100) + ")";
      }
      
    }
    count++;
    if(count >= maxCount){
      for(var prop in targetJSON){
        if(prop != "opacity"){
          _this.style[prop] = targetJSON[prop] + "px";
        }else{
          _this.style[prop] = targetJSON[prop];
          _this.style.filter = "alpha(opacity = " + (targetJSON[prop] * 100) + ")";
        }
      
      }
      clearInterval(timer);
      callback && callback();
    }
  },interval);
}

// 淡入
HTMLElement.prototype.fadeIn = function(duration, callback) {
  var _this = this;
  var counter = 0;
  var timer = null;
  // 每一次定时器执行元素的增幅
  var amplification = 0.05;
  var interval = duration / (1/amplification);

  callback = callback || 'no a function';

  this.style.display = 'block';
  this.style.opacity = 0;

  timer = setInterval(function() {
    counter += amplification;
    _this.style.opacity = counter;
    if (counter > 1) {
      clearInterval(timer);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }, interval);
}

// 淡出
HTMLElement.prototype.fadeOut = function(duration, callback) {
  var _this = this;
  var counter = 0;
  var timer = null;
  // 每一次定时器执行元素的增幅
  var amplification = 0.05;
  var interval = duration / (1/amplification);

  function getOpacity(dom) {
    var opacity = '';
    if (window.getComputedStyle(dom)) {
      opacity = window.getComputedStyle(dom)['opacity'];
    } else if (dom.currentStyle) {
      opacity = dom.currentStyle['opacity'];
    } else {
      opacity = 1;
    }
    return opacity;
  }

  callback = callback || 'not a function';
  counter = getOpacity(this);

  timer = setInterval(function() {
    counter -= amplification;
    _this.style.opacity = counter;
    if (counter < 0) {
      clearInterval(timer);
      _this.style.display = 'none';
      if (typeof callback === 'function') {
        callback();
      }
    }
  }, interval);

}

/**
 * 
 * @param { String }   dom                   元素选择器，以 . 或者 # 开头
 * @param { Number}    trigger               触发距离，距离浏览器窗口顶部的距离
 * @param { Number}    distance              动画移动的距离
 * @param { Number}    duration              动画持续时间 transition-duration 属性
 * @param { String }   timing_function       动画的 transition-timing-function 属性值
 * @param { Number }   interval              每一个子元素开始运动的间隔时间
 * @param { String }   direction             运动的方向 ( left / right/ top /bottom )
 */
// 在使用 apper 方法时先把运动的元素 opacity 设为 1，防止元素先出现再消失然后再运动的情况。
function apper(selector ,trigger, distance, duration, timing_function, interval, direction) {
  var dom = null;
  var transition = 'all ' + duration + 's ' + timing_function;
  var property = '';

  // 获取元素
  if (selector === '') { return; }
  if (selector.substr(0, 1) === '.') {
    dom = document.getElementsByClassName(selector.substr(1))[0];
  } else if (selector.substr(0, 1) === '#') {
    dom = document.getElementById(selector.substr(1));
  } else {
    dom = document.querySelector(selector);
  }
  if (!dom) { return };

  // 确定移动的方向要变化的属性
  switch (direction) {
    case 'top': property = 'top'; break;
    case 'bottom': property = 'bottom'; break;
    case 'left': property = 'left'; break;
    case 'right': property = 'right'; break;
    default: property = 'top';
  }

  var children = dom.children;
  var len = children.length;

  function recover() {
    this.style.transition = '';
  }

  // 子元素移动到开始运动的位置
  for (var i = 0; i < len; i++) {
    // 记录元素当前的位置，运动结束后要回到这个位置
    if (window.getComputedStyle) {
      children[i].pos = window.getComputedStyle(children[i])[property] === 'auto' ? 0 : window.getComputedStyle(children[i])[property];
    } else {
      children[i].pos = children[i].currentStyle[property];
    }
    children[i].style.position = 'relative';
    // 从当前位置向指定方向移动 distance 长度的距离
    children[i].style[property] = Number(String(children[i].pos).substr(0, children[i].pos.length-2)) + distance + 'px';
    children[i].style.opacity = '0';

    children[i].addEventListener('webkitTransitionEnd', recover.bind(children[i]), false);
  }

  function animate() {
    var top = dom.getBoundingClientRect().top;
    if (top < trigger) {
      for (var i = 0; i < len; i ++) {
        children[i].style.transition = transition + ' ' + i * interval + 's';
        children[i].style[property] = children[i].pos;
        children[i].style.opacity = '1';
      }
      window.removeEventListener('scroll', animate);
    }
  }

  window.addEventListener('load', function() {
    setTimeout(animate, 200);
  }, false);
  window.addEventListener('scroll', animate, false);
}

module.exports = {
  apper: apper
}