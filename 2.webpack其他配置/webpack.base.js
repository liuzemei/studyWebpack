
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    entry: {
        home: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV: "'production'", // 这里直接parse了一层，所以需要两层包住...
            DEV1: JSON.stringify('production'), // 我们经常这样用，避免上面的写法...
            FLAG:  'true'// 注意，boolean值 和 数字 ，可以直接用单引号表示，去掉单引号才正确。否则加上双引号就变成了字符串了。
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
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