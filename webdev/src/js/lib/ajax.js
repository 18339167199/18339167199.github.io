// 获取 ajax 对象，ie 为 ActiveObject， 其他为 XMLHttpRequest
function getXmlHttp() {
  var obj = null;
  //非IE浏览器创建XmlHttpRequest对象
  if (window.XMLHttpRequest) obj = new XMLHttpRequest();
  //IE浏览器创建XmlHttpRequest对象
  if (window.ActiveXObject) {
    try {
      obj = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
      try {
        obj = new ActiveXObject("msxml2.XMLHTTP");
      } catch (ex) { }
    }
  }
  return obj;
}

// 将参数转化成可以拼接到 url 的形式并做 encodeURIComponent 转化
function getAjaxParama(data) {
  var params = [];
  for (var key in data) {
    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return params.join('&');
}

// post请求方法
function post(url, data, success) {
  var xhr = this.getXmlHttp ? this.getXmlHttp() : getXmlHttp();

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var params = this.getAjaxParama ? this.getAjaxParama(data) : getAjaxParama(data);
  xhr.send(params);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        success && success(xhr.responseText);
      }
    }
  }
}

// get请求方法
function get(url, data, success) {
  var xhr = this.getXmlHttp ? this.getXmlHttp() : getXmlHttp();

  var params = this.getAjaxParama ? this.getAjaxParama(data, url) : getAjaxParama(data, url);
  params = url.indexOf("?") >= 0 ? params : "?" + params;
  url += params;

  xhr.open('GET', url, true);
  xhr.send(null);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        success && success(xhr.responseText);
      }
    }
  }
}

/**
 * 
 * 参数对象 opt 参考 JQuery 中的 $.ajax(obj)
 * {
 *   method: 'GET'   //请求的方式
 *   url: '/upload'   //请求的路径
 *   async: false     //同步或者异步
 *   dataType: 'json'  //数据类型
 *   contentType: 'application/x-www-form-urlencoded; charset=utf-8'   //请求头信息
 *   data: {
 *       
 *   }
 * }
 */
function ajax(opt) {
  // 初始化参数
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || "GET"; //GET / POST
  opt.url = opt.url || "";
  opt.async = opt.async || true; //同步异步
  opt.dataType = opt.dataType || "text"; //所传的数的数据类型
  opt.contentType = opt.contentType || "application/x-www-form-urlencoded; charset=utf-8"; //默认表单格式 opt.dataType='json'
  opt.data = opt.data || null;

  var xhr = this.getXmlHttp ? this.getXmlHttp() : getXmlHttp(); //获取XML 对象

  var postData = this.getAjaxParama ? getAjaxParama(opt.data) : getAjaxParama(opt.data); //data

  if (opt.contentType === "application/json;charset=utf-8" && opt.dataType === "json") {
    postData = JSON.stringify(opt.data); //转化为字符串
  }

  if (opt.method === 'POST') {
    xhr.open(opt.method, opt.url, opt.async);
    xhr.setRequestHeader('Content-Type', opt.contentType); //而POST请求需要设置请求头，用来传递参数
  } else if (opt.method === 'GET') {
    postData = opt.url.indexOf("?") >= 0 ? "&" + postData : "?" + postData; //GET请求，参数是拼接到url上面；
    xhr.open(opt.method, opt.url + postData, opt.async);
    postData = null; //重置参数
  }

  xhr.send(postData);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        opt.success && opt.success(xhr.responseText);
      } else {
        opt.error && opt.error(status);
      }
    }
  };
}

// 基于 FormData 的文件发送请求
function uploadFile(url, data, success) {
  var form = new FormData();

  for (var prop in data) {
    form.append(prop, data[prop]);
  }

  var xhr = this.getXmlHttp ? this.getXmlHttp() : getXmlHttp();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      success && success(data);
    } else {
      console.log("error");
    }
  };
  xhr.open('post', url, false);
  xhr.send(form);
}

var Request = {
  getXmlHttp: getXmlHttp,
  getAjaxParama: getAjaxParama,
  post: post,
  get: get,
  ajax: ajax,
  uploadFile: uploadFile,
}

module.exports = Request;