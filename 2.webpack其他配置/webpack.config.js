
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 多入口
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        // [name] home和other
        // [hash] 加上时间戳clear

        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home'] // 如果不加这个的话，默认的全部入口文件都会引用加载一遍。
        }),

        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ],
}