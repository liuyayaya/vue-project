// webpack.dev.js
// 存放 dev 配置
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');
console.log('hello', path.join(__dirname, 'dist'));
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: { // 开发服务器
    index: '../index.html',
    historyApiFallback: true,
    contentBase: './',
    publicPath: '/dist/',
    compress: true,
    hot: true,
    port: 9000
  },
  module: {
      rules:[
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
          }
      ]
  },
  mode: 'development',
  plugins:[
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: './src/template/index.ejs',
        inject: false
    }),
  ]
});