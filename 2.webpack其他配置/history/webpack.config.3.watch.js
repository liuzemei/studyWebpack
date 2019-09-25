
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
    watch: true,
    watchOptions: { // 监控的选项
        poll: 1000, // 每秒 问我 1000次 需要更新吗？比较合理的是1000...
        aggregateTimeout: 500, // 防抖的作用 我一直输入代码后 500ms 内是不重新打包的。
        ignored: /node_modules/ // 不需要进行监控哪个文件

    },
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