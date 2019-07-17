
// webpack.prod.js
// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包之前清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
            }
        },
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false, // 去除警告
                    drop_debugger: true, // 去除debugger
                    drop_console: true, // 去除console.log
                    compress: {},
                },
                chunkFilter: (chunk) => {
                    // Exclude uglification for the `vendor` chunk
                    if (chunk.name === 'vendor') {
                      return false;
                    }
                    return true;
                },
                cache: true, // 开启缓存
                parallel: true, // 平行压缩
                sourceMap: false // set to true if you want JS source maps
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
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
        ],
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: 'css/[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './src/template/index.ejs',
            inject: false
        }),
    ],
});