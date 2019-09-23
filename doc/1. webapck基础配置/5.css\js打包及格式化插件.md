
### 将css 代码以 link标签方式 引入
1. 安装插件
`yarn add mini-css-extract-plugin -D`
> 专门抽离 css 样式文件的插件
2. 在 webpack.config.js 文件中使用
```js
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    ...,
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css' // 打包之后的css文件名
        })
    ],
    module: {
        rules: [
            {
                test: '/\.css$/',
                use: [
                    MiniCssExtractPlugin.loader,// 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                    'css-loader'
                ]
            },
            {
                test: '/\.less$/',
                use: [
                    MiniCssExtractPlugin.loader,// 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                    'css-loader', 
                    'less-loader'
                ]
            }
        ]
    }
}
```
### 自动在 css 中 加上各个浏览器的适配前缀
1. 安装插件 和 loader
`yarn add postcss-loader autoprefixer -D`
2. 配置 postcss-loader
> 在`webpack.config.js`同级创建文件`postcss.config.js`
```js
module.exports = {
    plugins: [require('autoprefixer')]
}
```
3. 在 webpack.config.js 文件中使用
```js
module: {
    rules: [
        {
            test: '/\.css$/',
            use: [
                MiniCssExtractPlugin.loader,// 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: '/\.less$/',
            use: [
                MiniCssExtractPlugin.loader,// 将解析完的css代码生成文件，然后以link标签的方式插入到html文档中
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }
    ]
}
```
> 跟随着教程走，结果还是没有出现预期的结果，并没有出现自动加上浏览器适配前缀。

### 格式化打包后的 css 文件
1. 安装插件
`yarn add optimize-css-assets-webpack-plugin -D`
2. 配置 webpack.config.js
```js
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    optimization: { // 优化项
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    ...
}
```
> - 发现 css 压缩了，但是 js 文件并没有被压缩
> - 所以使用了 `optimize-css-assets-webpack-plugin` 之后，还得使用`uglifyjs-webpack-plugin` 来格式化压缩 js 文件

### 格式化打包后的 js 文件
1. 安装插件
`yarn add uglifyjs-webpack-plugin -D`
2. 使用插件(webpack.config.js)
```js
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
```
> - 注意： 这里再进行build时可能会产生报错，由于js文件还没有额外(babel)的处理，如果想看到效果的话，需要把所有`require`js的代码都注释掉。

### 最终源码：
```js
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
    mode: 'production', // 模式 默认两种 production(会压缩js文件) development
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
```