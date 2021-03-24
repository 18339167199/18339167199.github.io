var gulpfile = require('./config');

// 环境配置
var env = {};
env.htmlRootPath = './../';
env.imgSrcPath = ['./src/images/', './node_modules/joweb/src/images/'];
env.fontSrcPath = ['./src/fonts/', './node_modules/joweb/src/fonts/'];
env.fonts = ['Arial-Regular'];
env.connect = {};
env.connect.host = '127.0.0.1';
env.connect.port = 7024;
gulpfile.env(env);

// 发布生产环境文件
exports.publish = gulpfile.publish;

// 生成生产环境文件
exports.build = gulpfile.build;

// 开发环境
exports.default = gulpfile.default;