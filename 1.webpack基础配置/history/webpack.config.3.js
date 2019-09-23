// webpack 是node 写出来的 node的写法来运行

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWbpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: { // 优化项
        minimizer: [
            new UglifyjsWbpackPlugin({
                cache: true, // 是否用缓存
                parallel: true, // 是否并发打包
                sourceMap: true // es6 -> es5 源码映射 方便调试
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    mode: 'development', // 模式 默认两种 production(会压缩js文件) development
    entry: './src/index.js', //入口
    output: { // 出口
        filename: 'bundle.js', // 打包后的文件名 [hash:8] 只显示8位的hash文件
        path: path.resolve(__dirname, 'build') // 路径必须是一个绝对路径
    },
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 打包的模板路径
            filename: 'index.html', // 打包之后的文件名
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css', // 抽离的文件名
        })
    ],
    module: { // 模块
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: 'pre', // 强制这个loader最先执行
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env' // 这里面就是把es6 -> es5的模块
                        ],
                        plugins: [
                            [
                                '@babel/plugin-proposal-decorators',
                                { 'legacy': true }
                            ],
                            [   // 支持类(class)的写法
                                '@babel/plugin-proposal-class-properties',
                                { 'loose': true } // 宽松模式
                            ],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer") /*在这里添加*/
                            ]
                        }
                    }

                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, // 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer") /*在这里添加*/
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    }
}