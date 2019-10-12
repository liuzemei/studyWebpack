
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react' // 可以解析react语法
                        ]
                    }
                }
            }
        ],
        noParse: /jquery/
    },
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}