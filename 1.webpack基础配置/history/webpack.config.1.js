// webpack 是node 写出来的 node的写法来运行

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000, // 启动端口
        progress: true, // 滚动条
        contentBase: './build', // 启动服务的路径
        compress: true //压缩
    },
    mode: 'development', // 模式 默认两种 production(会压缩js文件) development
    entry: './src/index.js', //入口
    output: { // 出口
        filename: 'bundle.[hash:8].js', // 打包后的文件名 [hash:8] 只显示8位的hash文件
        path: path.resolve(__dirname, 'build') // 路径必须是一个绝对路径
    },
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 打包的模板路径
            filename: 'index.html', // 打包之后的文件名
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true
        })
    ],
    module: { // 模块
        rules: [ // 规则  css-loader 主要用于解析 @import 语法的
            // style-loader 他是把 css 插入 head 的标签中
            // loader的特点 希望单一
            // loader的用法： 字符串 只用一个loader
            // 多个loader 需要 []
            // loader的顺序 默认是从右向左(从下到上)执行， -> 先解析 @import 再插入 head 中
            // loader还可以写成 对象的方式
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: function insertAtTop(element) {
                                var parent = document.querySelector('head');
                                // eslint-disable-next-line no-underscore-dangle
                                var lastInsertedElement =
                                    window._lastElementInsertedByStyleLoader;

                                if (!lastInsertedElement) {
                                    parent.insertBefore(element, parent.firstChild);
                                } else if (lastInsertedElement.nextSibling) {
                                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                                } else {
                                    parent.appendChild(element);
                                }

                                // eslint-disable-next-line no-underscore-dangle
                                window._lastElementInsertedByStyleLoader = element;
                            },
                        }
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: function insertAtTop(element) {
                                var parent = document.querySelector('head');
                                // eslint-disable-next-line no-underscore-dangle
                                var lastInsertedElement =
                                    window._lastElementInsertedByStyleLoader;

                                if (!lastInsertedElement) {
                                    parent.insertBefore(element, parent.firstChild);
                                } else if (lastInsertedElement.nextSibling) {
                                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                                } else {
                                    parent.appendChild(element);
                                }

                                // eslint-disable-next-line no-underscore-dangle
                                window._lastElementInsertedByStyleLoader = element;
                            },
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}