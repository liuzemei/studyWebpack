
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
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
        }),
        new CleanWebpackPlugin(), // 每次buid之前清空一下dist目录
        new CopyWebpackPlugin([  // 将指定的from文件夹内的东西直接拷入dist/下
            { from: './public', to: './' }
        ]),
        new webpack.BannerPlugin('make 2019 by lzm') // 插入版权声明
    ],
    module: {
        rules: [
            {
                test: /\.js$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

}