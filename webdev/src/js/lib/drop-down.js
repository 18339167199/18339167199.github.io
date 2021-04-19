/**
 * 下拉功能
 */

var Func = require('./function.js');

(function() {
  // 配置参数
  var config = {
    //挂载元素
    el: '',
    //触发方式
    trigger: 'click',
    //当下拉之后添加的 class 类名
    classNameAfterDrop: 'drop-down-active',
    // 组件类名
    componentClassName: 'drop-down',
    // 组件 label 部分类名
    componentLabelClassNme: 'drop-down-label',
    // 组件 menu 部分类名
    componentMenuClassName: 'drop-down-menu'
  };
  var mod = {};

  function getEle(el) {
    var target = {};
    target.el = document.querySelector(el);
    target.items = target.el.getElementsByClassName(config.componentClassName);
    
    if (target.el === undefined || target.el === null) {
      throw new Error('element not found!');
    }

    return target;
  }

  function drop() {
    console.log(this)
  }

  function updateConfig(  ) {
    var props = arguments[0];
    var propsType = Func.getValType(props);
    switch (propsType) {
      case 'object':
        for (var prop in props) {
          if (prop in config) {
            config[prop] = props[prop];
          }
        }
        break;
      
      case 'string':
        config.el = props;
        break;

      default: break;
    }
  }


  mod.init = function() {
    // 更新配置
    var props = arguments[0];
    updateConfig(props)

    console.log(config)

    var targetDomObject = getEle(config.el);
    var len = targetDomObject.items.length;
    var trigger = config.trigger === 'click' ? 'click' : 'mouseenter';

    for (var i = 0; i < len; i ++) {
      var current = targetDomObject.items[i];
      current.addEventListener(trigger, drop.bind(current), false);
      if (trigger === 'mouseenter') {
        current.addEventListener('mouseleave', drop.bind(current), false);
      } 
    } 

  }


  this.DropDown = mod;
})();

module.exports = DropDown;