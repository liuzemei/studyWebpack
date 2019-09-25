
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        home: './src/index.js'
    },
    output: {
        // [name] home和other
        // [hash] 加上时间戳clear
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 1. 会单独产生一个sourcemao文件 出错了 会标识 当前报错的行和列
    // devtool: 'source-map', // 增加映射文件 可以帮我们调试源代码
    // 2. 不会产生单独的文件 但是可以显示行和列
    // devtool: 'eval-source-map',
    // 3. 不会产生列 但是是一个单独的映射文件，可以保留下来
    // devtool: 'cheap-module-map',
    // 4. 不会产生文件 继承在打包后的文件中 不会产生列
    // devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
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