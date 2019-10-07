

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        home: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
    resolve: { // 解析  第三方模块 
        // 在 common 规范中 会遍历上层路径找 node_modules
        modules: [path.resolve('node_modules')], // 不去上级目录找了，只在当前目录找node_modules
        alias: { // 别名 
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
            // 在 项目中 import 'bootstrap' --> 相当于 import了后面一长串,即，不会去找package.json中main的路径了，而是直接找到后边的一长串指定的路径。
        },
        mainFields: ['style', 'main'], // 找到package.json文件后，先找style模块，如果没有的话，就找main模块
        extensions: ['.vue', '.js', '.css'] // 当没有后缀名的时候，优先匹配vue 然后匹配 js  最后匹配css

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

}