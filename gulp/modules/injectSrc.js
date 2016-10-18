var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var headRegExp = /(<\/head>)/i;
var bodyRegExp = /(<\/body>)/i;
// 插件名
const PLUGIN_NAME = 'gulp-injectSrc';
function _injectSrc (src, html, type) {
  var regExp = type === 'head' ? headRegExp : bodyRegExp;
  return html.replace(regExp, function (match) {
    return src.join('') + match;
  });
}
function _genSrc (options, basePath, type) {
  type = type || 'body';
  var filter = type === 'head' ? function (option) {
    return option.pos === type;
  } : function (option) {
    return option.pos !== 'head'
  };
  var srcs = options.filter(filter);
  return srcs.map(function (src) {
    var ext;
    if (typeof src === 'string') {
      basePath = basePath + '/' + src;
      ext = src.split('.').pop();
    } else {
      basePath = basePath + '/' + src.name;
      ext = src.name.split('.').pop();
    }
    switch (ext) {
      case 'js':
        return '<script defer src="' + basePath +'"></script>\r\n';
        break;
      case 'css':
        return '<link rel="stylesheet" href="' + basePath + '">\r\n';
        break;
    }
    return '';
  });
}
module.exports = function (options, basePath) {
  if (!options) {
    throw new PluginError(PLUGIN_NAME, 'Missing options');
  }
  basePath = basePath || './';
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }
    var dirs = file.path.split('\\');
    basePath += '/' + dirs[dirs.length - 2];
    var html = file.contents.toString();
    html = _injectSrc(_genSrc(options, basePath), html);
    html = _injectSrc(_genSrc(options, basePath, 'head'), html, 'head');
    file.contents = new Buffer(html);
    this.push(file);
    cb();
  });
};
