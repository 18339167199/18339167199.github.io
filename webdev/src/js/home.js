var app = require('./lib/app.js');
app.loadHeader();

require('./lib/header.js');


// 
var home = {
  adoptMinHeight: function(el) {
    var minHeight = document.documentElement.clientHeight;
    
    el = document.querySelector(el) || document.querySelector('.lm-home');
    el.style.minHeight = minHeight + 'px';
  },
  init: function() {
    this.adoptMinHeight('.lm-home');
  }
}

home.init();