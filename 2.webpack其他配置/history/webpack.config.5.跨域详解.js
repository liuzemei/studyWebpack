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
    devServer: {
        // 1. 后端写好的接口
        // proxy: { // 重写的方式 把请求代理到express服务器上
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // },

        // 2. 我们前端指向单纯来模拟数据
        // before(app) { // 提供的方法 钩子
        //     app.get('/api/user', (req,res) => {
        //         res.json({name: 'LZM-before'})
        //     })
        // }

        // 3. 有服务端 不用代理来处理 能不能再服务端中启动 webpack 端口，且端口用服务端端口。(详情见readme.md)
    },
    plugins: [
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