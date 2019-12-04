var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var babel_polyfill = require('babel-polyfill');

// import 
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './src/router.jsx');
var BUILD_PATH = path.resolve(__dirname, './build');
module.exports = {
    entry: ["babel-polyfill", APP_PATH],
    output: {
        path: BUILD_PATH,
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // sourceMap: true,
                                plugins: [
                                    autoprefixer({
                                        /*
                                         gulp-autoprefixer的browsers参数详解：
                                         last 2 versions: 主流浏览器的最新两个版本
                                         last 1 Chrome versions: 谷歌浏览器的最新版本
                                         last 2 Explorer versions: IE的最新两个版本
                                         last 3 Safari versions: 苹果浏览器最新三个版本
                                         Firefox >= 20: 火狐浏览器的版本大于或等于20
                                         iOS 7: IOS7版本
                                         Firefox ESR: 最新ESR版本的火狐
                                         > 5%: 全球统计有超过5%的使用率
                                         */
                                        browsers: ['last 3 Safari versions', 'last 2 versions', 'iOS 7', 'Android >= 4.0', 'Firefox >= 20'],
                                        cascade: true, //是否美化属性值 默认：true 像这样：
                                        //-webkit-transform: rotate(45deg);
                                        //        transform: rotate(45deg);
                                        remove: false //是否去掉不必要的前缀 默认：true
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            // sourceMap: true
                        }
                    }
                })
            }
        ]
    },
    //plugins: [
    //	new webpack.BannerPlugin('This file is created by fzh')
    //]
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './dist/index.html'
        // }),
        new ExtractTextPlugin("style.css"), //提取出来的样式放在style.css文件中
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
};