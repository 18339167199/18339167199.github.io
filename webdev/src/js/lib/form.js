var forIE = require("./for-ie");

// Form
var Form = {};
(function(){
  var options = {};

  // 选择框
  function openMenu() {
    var menu = this.getElementsByClassName('jw-form-select-content')[0];
    var statu = menu.style.display;
    menu.style.display = (statu === '' || statu === 'none') ? 'block' : 'none';
    (statu === '' || statu === 'none') ? menu.classList.add('jw-select-open') : menu.classList.remove('jw-select-open');
    this.getElementsByClassName('jw-form-icon')[0].style.transform = (statu === '' || statu === 'none') ? 'rotate(180deg)' : '';
  }

  // 单选方法
  function selected(e) {
    var parent = this.parentNode;
    e = window.event || e;
    var target = e.target || e.srcElement;
    if (target.classList.contains('jw-select-tips')) {
      return;
    }
    parent.getElementsByClassName('jw-form-select')[0].value = target.innerText;
    parent.getElementsByTagName('input')[1].value = target.getAttribute('jw-value');
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].classList.remove('jw-selected');
    }
    target.classList.add('jw-selected');
  }

  // 下拉多选方法
  function multipleSelected(e) {
    forIE.isIE() ? window.event.cancelBubble = true : e.stopPropagation();
    var parent = this.parentNode;
    e = window.event || e;
    var target = e.target || e.srcElement;
    var statu = target.classList.contains('jw-selected');
    var showInput = parent.getElementsByClassName('jw-form-select')[0];
    var input = parent.getElementsByTagName('input')[1];

    if (target.classList.contains('jw-select-tips') || target.classList.contains('jw-form-select-content')) {
      return;
    }
    
    if (statu) {
      // 取消选中
      target.classList.remove('jw-selected');
      var chooseArr = showInput.value.split(',');
      chooseArr.splice(chooseArr.indexOf(target.innerText), 1);
      showInput.value = chooseArr.join(',');

      var valueArr = input.value.split(',');
      valueArr.splice(valueArr.indexOf(target.getAttribute('jw-value')), 1);
      input.value = valueArr.join(',');
    } else {
      // 选中
      target.classList.add('jw-selected');
      showInput.value = (showInput.value === '' ? target.innerText : showInput.value + ',' + target.innerText);
      input.value = (input.value === '' ? target.getAttribute('jw-value') : input.value + ',' + target.getAttribute('jw-value'));
    }
  }

  // 渲染select控件事件
  function renderSelector(jwForm) {
    var selectArr = jwForm.getElementsByClassName('jw-form-select');
    var len = selectArr.length;

    for (var j = 0; j < len; j++) {
      var parent = selectArr[j].parentNode;
      var dl = parent.getElementsByClassName('jw-form-select-content')[0];
      var showInput = parent.getElementsByTagName('input')[0];
      var input = document.createElement('input');

      showInput.value = dl.getElementsByClassName('jw-selected')[0] ? dl.getElementsByClassName('jw-selected')[0].innerText : 'please choose';
      input.setAttribute('name', dl.getAttribute('name'));
      input.value = dl.getElementsByClassName('jw-selected')[0] ? dl.getElementsByClassName('jw-selected')[0].getAttribute('jw-value') : '';
      input.style.display = 'none';
      parent.appendChild(input);

      if (dl.getAttribute('multiple') !== null) {
        dl.addEventListener('click', multipleSelected.bind(dl), false);
      } else {
        dl.addEventListener('click', selected.bind(dl), false);
      }
      parent.addEventListener('click', openMenu.bind(parent), false);
    }
  }

  // 多选框
  function check(e) {
    e = window.event || e;
    var statu = this.classList.contains('jw-checkbox-item-active');
    statu ? this.classList.remove('jw-checkbox-item-active') : this.classList.add('jw-checkbox-item-active');
    this.getElementsByTagName('input')[0].checked = !statu;
  }

  // 渲染多选框checkbox控件
  function renderCheckbox(jwFrom) {
    var checkboxArr = jwFrom.getElementsByClassName('jw-form-checkbox');
    var len = checkboxArr.length;

    for (var j = 0; j < len; j++) {
      // 每个 form 中的一个 checkbox
      var items = checkboxArr[j].children;
      var name = checkboxArr[j].getAttribute('name');

      // 为每个选项生成一个input
      for (var k = 0; k < items.length; k++) {
        var input = document.createElement('input');
        input.setAttribute('name', name);
        input.setAttribute('type', 'checkbox');
        input.value = items[k].getAttribute('jw-value');
        if (items[k].classList.contains('jw-checkbox-item-active')) {
          input.checked = true;
        }
        input.style.display = 'none';

        items[k].appendChild(input);
        items[k].addEventListener('click', check.bind(items[k]), false);
      }
    }
  }

  // 开关
  function toggle() {
    var statu = this.classList.contains('jw-form-switch-active');
    statu ? this.classList.remove('jw-form-switch-active') : this.classList.add('jw-form-switch-active');
    this.children[0].innerText = statu ? this.statu1 : this.statu2;
    this.getElementsByTagName('input')[0].checked = !statu;
  }

  // 渲染开关控件
  function renderToggle(jwFrom) {
    var switchArr = jwFrom.getElementsByClassName('jw-form-switch');
    var len = switchArr.length;

    for (var j = 0; j < len; j++) {
      var name = switchArr[j].getAttribute('name');
      var input = document.createElement('input');

      var statuText = switchArr[j].getAttribute('text');

      switchArr[j].statu1 = statuText.split('/')[0];
      switchArr[j].statu2 = statuText.split('/')[1];

      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', name);
      input.style.display = 'none';
      if (switchArr[j].classList.contains('jw-form-switch-active')) {
        input.checked = true;
        switchArr[j].children[0].innerText = switchArr[j].statu2;
      }
      switchArr[j].appendChild(input);

      switchArr[j].addEventListener('click', toggle.bind(switchArr[j]), false);
    }
  }

  // 单选框
  function radio() {
    if (this.classList.contains('jw-form-radio-active')) {
      return;
    }

    var items = this.parentNode.children;
    var len = this.parentNode.children.length;
    for (var i = 0; i < len; i++) {
      items[i].classList.remove('jw-form-radio-active');
    }
    this.classList.add('jw-form-radio-active');
    this.getElementsByTagName('input')[0].checked = true;
  }

  // 渲染单选框控件
  function renderRadio(jwForm) {
    var radioArr = jwForm.getElementsByClassName('jw-form-radio');
    var len = radioArr.length;

    for (var j = 0; j < len; j++) {
      var name = radioArr[j].getAttribute('name');
      var items = radioArr[j].children;

      for (var k = 0; k < items.length; k++) {
        var input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', name);
        input.value = items[k].getAttribute('jw-value');
        input.style.display = 'none';
        if (items[k].classList.contains('jw-form-radio-active')) {
          input.checked = true;
        }
        items[k].appendChild(input);
        items[k].addEventListener('click', radio.bind(items[k]), false);
      }
    }
  }

  function renderForm()
  {
    // 渲染表单
    var jwFormItem = document.getElementsByClassName('jw-form');
    var jwFormItemLen = jwFormItem.length;
    for (var i = 0; i < jwFormItemLen; i++) {
      renderSelector(jwFormItem[i]);
      renderCheckbox(jwFormItem[i]);
      renderToggle(jwFormItem[i]);
      renderRadio(jwFormItem[i]);
    }
  }

  // 接口
  var api = {
    //参数设定
    config: function (opts) {
      if(!opts) return options;
      for(var key in opts) {
        options[key] = opts[key];
      }
      return this;
    },
    // 初始化
    init: function (opts) {
      this.config(opts);
      renderForm();
    }
  }

  // 发布接口
  Form = api;
})();

module.exports = Form;