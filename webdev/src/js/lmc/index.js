var fs = require('fs');

(function() {
  var config = {
    java_file_path: __dirname + '/java',
    nav_dom: document.querySelector('#java-question-list ul'),
  }

  fs.readdir(config.java_file_path, function(err, files) {
    if (err) {
      console.log(err);
    } else {
      console.log(files.length);
    }

    var files_len = files.length;
    var nav_innerHTML = '';

    for (var i = 0; i < files_len; i ++) {
      var current = files[i];
      nav_innerHTML += '<li><a href="#' + current + '">' + current + '</a></li>'
    }

    config.nav_dom.innerHTML = nav_innerHTML;
  })
}());