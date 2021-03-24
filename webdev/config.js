//引入gulp和gulp插件
var { watch, series, parallel, src, dest } = require('gulp');
var revHash = require('gulp-rev-hash3');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var connect = require('gulp-connect');
var pump = require('pump');
var url = require('url');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var rewrite = require('http-rewrite-middleware');
var log = require('fancy-log');
const open = require('gulp-open');

// 环境配置 BEGIN
var env = {};

// 生产环境[true:是;flase:否]
env.production = false;

// 网站的html文件所在路径
env.htmlRootPath = './sample/';

// 资源目录
// env.assetsPath = 'assets/';
Object.defineProperty(env, 'assetsPath', (() => {
  var _assetsPath = '';
  return {
    set:function(path){
      _assetsPath = path;
    },
    get:function(){
      return _assetsPath ? env.htmlRootPath + _assetsPath : env.htmlRootPath + 'assets/';
    }
  };
})());
env.assetsPath = 'assets/';

// 生成网站的assets js文件所在路径
// env.jsAssetsPath = 'js/';
Object.defineProperty(env, 'jsAssetsPath', (() => {
  var _jsAssetsPath = '';
  return {
    set:function(path){
      _jsAssetsPath = path;
    },
    get:function(){
      return _jsAssetsPath ? env.assetsPath + _jsAssetsPath : env.assetsPath + 'js/';
    }
  };
})());

// 生成网站的assets css文件所在路径
// env.cssAssetsPath = 'css/';
Object.defineProperty(env, 'cssAssetsPath', (() => {
  var _cssAssetsPath = '';
  return {
    set:function(path){
      _cssAssetsPath = path;
    },
    get:function(){
      return _cssAssetsPath ? env.assetsPath + _cssAssetsPath : env.assetsPath + 'css/';
    }
  };
})());

// 生成网站的assets 图片文件所在路径
// env.imgAssetsPath = 'images/';
Object.defineProperty(env, 'imgAssetsPath', (() => {
  var _imgAssetsPath = '';
  return {
    set:function(path){
      _imgAssetsPath = path;
    },
    get:function(){
      return _imgAssetsPath ? env.assetsPath + _imgAssetsPath : env.assetsPath + 'images/';
    }
  };
})());

// 生成网站的assets 字体文件所在路径
// env.fontAssetsPath = 'fonts/';
Object.defineProperty(env, 'fontAssetsPath', (() => {
  var _fontAssetsPath = '';
  return {
    set:function(path){
      _fontAssetsPath = path;
    },
    get:function(){
      return _fontAssetsPath ? env.assetsPath + _fontAssetsPath : env.assetsPath + 'fonts/';
    }
  };
})());

// 开发测试模式资源目录

// 开发环境根路径
env.srcPath = './src/';

// 脚本文件js开发目录
// env.jsSrcPath = 'js/';
Object.defineProperty(env, 'jsSrcPath', (() => {
  var _jsSrcPath = '';
  return {
    set:function(path){
      _jsSrcPath = path;
    },
    get:function(){
      return _jsSrcPath ? env.srcPath + _jsSrcPath : env.srcPath + 'js/';
    }
  };
})());

// 样式文件scss开发目录
//env.scssSrcPath = 'sass/';
Object.defineProperty(env, 'scssSrcPath', (() => {
  var _scssSrcPath = '';
  return {
    set:function(path){
      _scssSrcPath = path;
    },
    get:function(){
      return _scssSrcPath ? env.srcPath + _scssSrcPath : env.srcPath + 'sass/';
    }
  };
})());

// 图片资源开发目录
env.imgSrcPath = env.srcPath + 'images/';
/*Object.defineProperty(env, 'imgSrcPath', (() => {
  var _imgSrcPath = '';
  return {
    set:function(path){
      _imgSrcPath = path;
    },
    get:function(){
      return _imgSrcPath ? env.srcPath + _imgSrcPath : env.srcPath + 'images/';
    }
  };
})());*/

// 图片资源格式
env.imgType = '{gif,jpg,png,svg,webp,ico}';

// 字体资源开发目录
env.fontSrcPath = env.srcPath + 'fonts/';
/*Object.defineProperty(env, 'fontSrcPath', (() => {
  var _fontSrcPath = '';
  return {
    set:function(path){
      _fontSrcPath = path;
    },
    get:function(){
      return _fontSrcPath ? env.srcPath + _fontSrcPath : env.srcPath + 'fonts/';
    }
  };
})());*/

// 使用到的字体
env.fonts = ['iconfont'];

// 字体资源格式
env.fontType = '{eot,svg,ttf,woff,woff2}';

// 服务器配置
env.connect = {};

// 服务器路径，一般与env.htmlRootPath一致
// env.connect.root = env.htmlRootPath;
Object.defineProperty(env.connect, 'root', (() => {
  var _root = '';
  return {
    set:function(path){
      _root = path;
    },
    get:function(){
      return _root ? _root : env.htmlRootPath;
    }
  };
})());

// 端口号
env.connect.port = 6023;

// 实时更新网页资源预览
env.connect.livereload = true;

// 服务器地址
env.connect.host = '127.0.0.1';

env.devAssets = '__assets/';
// 环境配置 END

// TODO: 清理
const clean = function (cb) {
  cleanFonts(cb);
  //cleanDevAssets(cb);
  //series(cleanFonts, cleanDevAssets)();
  cb();

};

// 清理字体文件
const cleanFonts = function(cb) {
  if (fs.existsSync(env.fontAssetsPath)) {
    del.sync([env.fontAssetsPath + '**'], {force: true});
    cb();
  }
};

// 清理开发目录
const cleanDevAssets = function(cb) {
  var devAssetsPath = env.htmlRootPath + env.devAssets;
  log('Starting \'cleanDevAssets\'...');
  if (fs.existsSync(devAssetsPath)) {
    del.sync([devAssetsPath], {force: true});
    log('Deleted: ' + devAssetsPath);
  }
  log('Finished \'cleanDevAssets\'');
  cb();
};

// 创建资源目录
const createAssetsPath = function(cb) {
  if(createPath(env.assetsPath)) {
    createPath(env.jsAssetsPath); 
    createPath(env.cssAssetsPath); 
    createPath(env.imgAssetsPath);
    createPath(env.fontAssetsPath);
  }
  cb();
}

// 创建src目录
const createSrcPath = function(cb) {
  createPath(env.srcPath);
  createPath(env.jsSrcPath);
  createPath(env.scssSrcPath);
  createPath(Array.isArray(env.imgSrcPath) ? env.imgSrcPath[0] : env.imgSrcPath);
  createPath(Array.isArray(env.fontSrcPath) ? env.fontSrcPath[0] : env.fontSrcPath);
  cb();
}

// 创建目录
const createPath = function(path) {
  try {
    //if (!fs.existsSync(path)) {
      log('Create path: ' + path);
      return mkdirp(path);
    //}
  } catch(err) {
    console.error(err);
  }
}

// 遍历html文件资源链接，添加hash参数
const revHtml = function(cb) {
  src([ 
    env.htmlRootPath + '*.html', 
    env.htmlRootPath + '**/*.html', 
    '!node_modules/**', 
    '!' + env.htmlRootPath + 'webdev/**'])
      .pipe(revHash({
        assetsDir: env.htmlRootPath,
      }))
      .pipe(dest(env.htmlRootPath));
  cb();
};

// 编译js
const jsTranspile = function(cb) {
  src(env.jsSrcPath + '*.js')
    .pipe(browserify({
      insertGlobals : false,
      debug : !env.production,
      paths: [ __dirname + '/src/js' ],
      transform: ['brfs']
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(dest(env.jsAssetsPath))
    .pipe(connect.reload());
  cb();
};

// 编译并压缩js
const jsMinify = function(cb) {
  src(env.jsSrcPath + '*.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: !env.production,
      paths: [ __dirname + '/src/js' ],
      transform: ['brfs']
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(dest(env.jsAssetsPath));
  cb();

  /*pump(
    src(env.jsSrcPath + '*.js')
      .pipe(browserify({
        insertGlobals: false,
        debug: !env.production,
        paths: [ __dirname + '/src/js' ]
      }))
      .pipe(uglify())
      .pipe(rename({
        extname: '.js'
      }))
      .pipe(dest(env.jsAssetsPath)),
    cb
  );*/
};

// 编译scss为目标css
const cssSass = function (cb) {
  src([env.scssSrcPath + '*.scss', env.scssSrcPath + '**/*.scss'])
    .pipe(sass({includePaths: ['node_modules']})
    .on('error', sass.logError))
    .pipe(dest(env.cssAssetsPath))
    .pipe(connect.reload());
  cb();
};

// 压缩css
const cssMinify = function(cb) {
  src([env.scssSrcPath + '*.scss', env.scssSrcPath + '**/*.scss'])
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(dest(env.cssAssetsPath));
  cb();
}

// 图片资源目录
const getImagesSrcPath = function() {
  var imagesSrc = new Array();
  // 判断是否为数组
  if (Array.isArray(env.imgSrcPath)) {
    for(var i = 0; i < env.imgSrcPath.length; i++) {
      imagesSrc.push(env.imgSrcPath[i] + '*.'+env.imgType, env.imgSrcPath[i] + '**/*.'+env.imgType);
    }
  } else {
    imagesSrc.push(env.imgSrcPath + '*.'+env.imgType, env.imgSrcPath + '**/*.'+env.imgType);
  }
  return imagesSrc;
}

// 图片资源
const buildImagesDev = function(cb) {
  log('buildImagesDev: ' + env.imgAssetsPath);
  src(getImagesSrcPath()).pipe(dest(env.imgAssetsPath));
  cb();
}

// 字体资源目录
const getFontsSrcPath = function() {
  var fontsSrc = new Array();
  if (env.fonts.length > 0) {
    var fonts = env.fonts.length > 1 ? '{' + env.fonts.join(',') + '}' : env.fonts[0];
    // 判断是否为数组
    if (Array.isArray(env.fontSrcPath)) {
      for(var i = 0; i < env.fontSrcPath.length; i++) {
        fontsSrc.push(
          env.fontSrcPath[i] + '*' + fonts + '/*.'+env.fontType
        );
      }
    } else {
      fontsSrc.push(
        env.fontSrcPath + '*' + fonts + '/*.'+env.fontType
      );
    }
  } else if(env.fonts === 'all') {
    // 判断是否为数组
    if (Array.isArray(env.fontSrcPath)) {
      for(var i = 0; i < env.fontSrcPath.length; i++) {
        fontsSrc.push(
          env.fontSrcPath[i] + '*.'+env.fontType, 
          env.fontSrcPath[i] + '**/*.'+env.fontType
        );
      }
    } else {
      fontsSrc.push(
        env.fontSrcPath + '*.'+env.fontType, 
        env.fontSrcPath + '**/*.'+env.fontType
      );
    }
  }
  return fontsSrc;
}

// 字体资源
const buildFontsDev = function(cb) {
  var fontPath = getFontsSrcPath();
  log('buildFontsDev: ' + env.fontAssetsPath);
  if (fontPath.length > 0) {
    src(fontPath).pipe(dest(env.fontAssetsPath));
  }
  cb();
}

// 构建资源（生成用于生产环境的css、js文件）
const defaultDev = function (cb) {
  // 监听资源文件修改，生成文件
  watch([env.scssSrcPath + '*.scss', env.scssSrcPath + '**/*.scss'], series(cssSass));

  // 监听资源文件修改，生成文件
  watch([env.jsSrcPath + '*.js', env.jsSrcPath + '**/*.js'], series(jsTranspile));

  // 监听图片资源
  watch(getImagesSrcPath(), series(buildImagesDev));

  // 监听字体资源
  var fontPath = getFontsSrcPath();
  if (fontPath.length > 0) {
    watch(getFontsSrcPath(), series(buildFontsDev));
  }

  cb();
};

// 开发环境配置
const dev = function (cb) {
  env.production = false;
  env.assetsPath = env.devAssets;
  cleanDevAssets(cb);
  cb();
}

// 构建资源（生成用于生产环境的css、js文件）
const build = function (cb) {
  env.production = true;
  cb();
};

// 发布资源（生成用于生产环境的css、js文件，html资源链接添加文件hash参数）
const publish = function(cb) {
  env.production = true;
  cb();
}

// 启动服务器
const webserver = function(cb) {
  connect.server({
      name: 'Dev App',
      root: env.connect.root,
      livereload: env.connect.livereload,
      port: env.connect.port,
      host: env.connect.host,
      middleware: function(connect, opt) {
        return [rewrite.getMiddleware([
          { from: '^/assets/js/(.*)$', to: '/'+env.devAssets+'js/$1' },
          { from: '^/assets/css/(.*)$', to: '/'+env.devAssets+'css/$1' },
          { from: '^/assets/images/(.*)$', to: '/'+env.devAssets+'images/$1' },
          { from: '^/assets/fonts/(.*)$', to: '/'+env.devAssets+'fonts/$1' }
        ])];
      }
  });

  // node进程结束
  process.on('exit', () => {
    log('process exit')
    devdone(cb);
  });

  cb();
}

// 打开浏览器
const openbrowser = function (cb) {
  var uri = 'http://' + env.connect.host + ':' + env.connect.port;
  src(env.connect.root).pipe(open({ uri: uri, app: 'chrome' }));
};

// 结束开发
const devdone = function(cb) {
  cleanDevAssets(cb);
}

// 配置环境变量，只支持二级配置
exports.env = function(newEnv) {
  for (const [key, value] of Object.entries(newEnv)) {
    // 判断配置项是否存在
    if (env.hasOwnProperty(key)) {
      switch(typeof value) {
        case 'number':
          env[key] = value;
          break;
        case 'string':
          env[key] = value;
          break;
        // 数组或对象
        case 'object':
          if (Array.isArray(value)) {
            env[key] = value;
          } else {
            for (const [key2, value2] of Object.entries(newEnv[key])) {
              if (env[key].hasOwnProperty(key2)) {
                env[key][key2] = value2
              }
            }
          }
          break;
      }

    }
  }
  return env;
};

// 发布生产环境文件
exports.publish = series(
  publish,
  clean,
  createSrcPath,
  createAssetsPath,
  parallel(jsMinify, cssMinify, buildImagesDev, buildFontsDev),
  parallel(revHtml)
);

// 生成生产环境文件
exports.build = series(
  build,
  clean,
  createSrcPath,
  createAssetsPath,
  parallel(jsMinify, cssMinify, buildImagesDev, buildFontsDev)
);

// 开发环境
exports.default = series(
  dev,
  clean,
  createSrcPath,
  createAssetsPath,
  parallel(cssSass, jsTranspile, buildImagesDev, buildFontsDev),
  defaultDev,
  webserver,
  openbrowser
);