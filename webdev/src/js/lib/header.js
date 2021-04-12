(function () {
  // 配置
  var config = {
    prefix: '.lm-header',
  }

  var header = document.querySelector(config.prefix);
  var collapse_btn = header.querySelector(config.prefix + '-collapse');
  var collapse_menu = header.querySelector(config.prefix + '-menu');

  if (!header || !collapse_btn || !collapse_menu) {
    console.log('header.js not executed complete')
    return false;
  }

  function collapse() {
    var collapse_height = 0;
    var ul = this.querySelector('ul');
    if (ul && !this.classList.contains('lm-menu-open')) {
      collapse_height = ul.offsetHeight;
      this.style.height = collapse_height + 'px';
      this.style.transition = 'height .25s ease 0s';
      this.classList.add('lm-menu-open');
    } else {
      this.setAttribute('style', '');
      this.classList.remove('lm-menu-open');
    }
  };

  var handleMenuOpen = collapse.bind(collapse_menu);

  collapse_btn.addEventListener('click', handleMenuOpen, false);
}())