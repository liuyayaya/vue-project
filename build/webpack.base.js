const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
// 使用happypack
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: './src/main', //入口
    output: { // 输出
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js' // 每次保存 hash 都变化
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.js$/, 
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.js$/, 
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
                //排除node_modules 目录下的文件
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.less$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader',
              ],
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    limit: 5000,
                    name: "imgs/[hash].[ext]",
                  }
                },
                // 图片压缩
                {
                  loader: 'image-webpack-loader',
                  options: {
                    //   bypassOnDebug: true,
                    mozjpeg: {
                      progressive: true,
                      quality: 65
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    }
                  },
                },
              ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      limit: 5000,
                      // 分离图片至imgs文件夹
                      name: "imgs/[name].[ext]",
                    }
                  },
                ]
            },
        ]
    },
    plugins: [
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HappyPack({
            //用id来标识 happypack处理类文件
            id: "happyBabel",
            //如何处理 用法和loader 的配置一样
            loaders: [
              {
                loader: "babel-loader?cacheDirectory=true"
              }
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
    ],// 插件
};