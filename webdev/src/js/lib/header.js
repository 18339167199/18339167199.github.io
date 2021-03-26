(function () {
  // 配置
  var config = {
    prefix: '.lm-header',
  }

  var header = document.querySelector(config.prefix);
  var collapse_btn = header.querySelector(config.prefix + '-collapse');
  var collapse_menu = header.querySelector(config.prefix + '-menu');

  if (!header) {
    return false;
  }

  function collapse() {
    var collapse_height = 0;
    var ul = collapse_menu.querySelector('ul');
    if (ul) {
      collapse_height = ul.offsetHeight;
    }
  }

  collapse_btn.addEventListener('click', collapse, false);
}())