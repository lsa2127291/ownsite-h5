var path = require('path');
var webpack = require('webpack');
// 第三方库文件打包
module.exports = {
  entry: {
    react: ['react', 'react-dom', 'react-css-modules', 'redux', 'react-redux', 'redux-thunk']
  },
  output: {
    path: path.join(__dirname, 'build/vendor'),
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, 'build/vendor', '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_library'
    }), new webpack.optimize.UglifyJsPlugin({ sourceMap: false, compress: {
      // 不考虑对象的边际作用
      pure_getters: true,
      // 不支持ie8
      screw_ie8: true,
      // 进行一些可能会破坏代码的压缩,如new Array会装换为 [1,2,3]
      unsafe: true,
      // 对<,<=转换为 >,>=
      unsafe_comps: true,
      // 不对删除一些unused的代码进行警告
      warnings: false
    }, output: {comments: false} })
  ]
};
