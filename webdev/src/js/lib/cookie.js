/**
 * cookie 操作方法
 * var cookie = require('./lib/cookie')
 * cookie.set(name, value, min) 
 *   -name: cookie 名称
 *   -value: cookie 值
 *   -min: 过期时间（分钟）
 *   -g：是否是全局cookie
 *     -- false: 单个页面有效
 *     -- true: 整个站点有效
 * 
 * cookie.get(name)
 *   -name: cookie 名称
 * 
 * cookie.del(name)
 *   -name: cookie 名称
 */
function setCookie(name, value, min, g) {
  var exp = new Date();
  var str = '';
  if (g) {
    str = ';path=/;';
  }
  exp.setTime(exp.getTime() + min * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + str;
}

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

module.exports = {
  get: getCookie,
  set: setCookie,
  del: delCookie,
};