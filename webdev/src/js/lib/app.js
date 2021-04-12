var fs = require('fs');
var app = {};
app.ejs = require('ejs');

// config
app.config = {
  header: '.lm-header',
}

// 加载 header
app.loadHeader = function() {
  var htmlStr = fs.readFileSync(__dirname + '../../../view/lib/header.ejs', { encoding: 'UTF-8' });
  var header = document.querySelector(this.config.header);

  if (header) {
    header.innerHTML = htmlStr;
    console.log('header load');
  } else {
    throw new Error('header Element not found!');
  }
}

module.exports = app;