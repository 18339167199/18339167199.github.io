/**
 * 提供常用的功能函数，如 邮箱验证, 变量类型检测等
 * 
 * var Func = require('./lib/function.js');
 * 
 */
(function() {
  var mod = {};

  // 判断 val 的数据类型
  mod.getValType = function(val) {
    var typeofStr = typeof val;
    var map = {
      '[object String]': 'string',
      '[object Number]': 'number',
      '[object Boolean]': 'boolean',
      '[object Null]': 'null',
      '[object Undefined]': 'undefined',
      '[object Array]': 'array',
      '[object Function]': 'function',
      '[object Object]': 'object'
    };

    return map[Object.prototype.toString.call(val)];
  }


  this.Func = mod;
})();

module.exports = Func;