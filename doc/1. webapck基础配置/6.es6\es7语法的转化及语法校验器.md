
### 转化 es6 语法(babel)
1. 安装
`yarn add babel-loader @babel/core @babel/preset-env -D`
2. 在 webpack.config.js 中 使用
```js
module: { // 模块
    rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env' // 这里面就是把es6 -> es5的模块
                        ]
                    }
                },
            ]
        }
    ]
}
```
> 可以与 uglifyjs 一起用了

### 支持 class 语法 
1. 安装插件
`yarn add @babel/plugin-proposal-class-properties -D`

2. 配置插件
```js
module: { // 模块
    rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env' // 这里面就是把es6 -> es5的模块
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties' // 支持类(class)的写法
                        ]
                    }
                },
            ]
        }
    ]
}
```

### 支持 装饰器写法 @ ... 
1. 安装
`yarn add @babel/plugin-proposal-decorators -D`
2. 使用
```js
// module.rules[0]
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: { // 用 babel-loader 需要把 es6 -> es5
            presets: [
                '@babel/preset-env' // 这里面就是把es6 -> es5的模块
            ],
            plugins: [
                [
                    '@babel/plugin-proposal-decorators',
                    { 'legacy': true }
                ],
                [   // 支持类(class)的写法
                    '@babel/plugin-proposal-class-properties',
                    { 'loose': true } // 宽松模式
                ]
            ]
        }
    },
}
```

### @babel/plugin-transform-runtime
1. 安装
`yarn add @babel/plugin-transform-runtime -D` // 运行时开发依赖
`yarn add @babel/runtime` // 生产环境依赖

2. 使用
```js
// module.rules[0]
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: { // 用 babel-loader 需要把 es6 -> es5
            presets: [
                '@babel/preset-env' // 这里面就是把es6 -> es5的模块
            ],
            plugins: [
                ['@babel/plugin-proposal-decorators',{ 'legacy': true }],
                ['@babel/plugin-proposal-class-properties',{'loose': true } ],
                '@babel/plugin-transform-runtime'
            ]
        }
    },
    include: path.resolve(__dirname, 'src'), // 只作用于src下的文件
    exclude: /node_modules/, // 不作用的文件夹
},
```

### es7 语法
1. 安装
`yarn add @babel/polyfill`
2. 在入口js文件中`index.js`使用
```js
require('@babel/polyfill');
'aaa'.includes('a'); // ok 
// 其实底层是直接重新实现了includes方法
```

### 校验器 eslint
1. 安装
`yarn add eslint eslint-loader -D`
2. 生成 校验器文件
- 1. 打开`https://eslint.org/demo/`
- 2. 选择使用环境、语法、ECMA版本、模块...
- 3. 下载 `.eslintrc.json` 文件
- 4. 拖到`webpack.config.js`同级目录下
> 注意，文件名须为`.eslintrc.json`，需要加上一个`.`
3. 配置 `webpack.config.js`文件
```js

// module.rules[0]
{
    test: /\.js$/,
    use: {
        loader: 'eslint-loader',
        options: {
            enforce: 'pre', // 强制这个loader最先执行
        }
    }
},
```
> 1. loader的类型
> - pre 前面执行的loader
> - normal 普通的loader
> - 内联loader
> - post 后面执行的loader

### 最终代码
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
    mode: 'development', // 模式 默认两种 production(会压缩js文件) development
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
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: 'pre', // 强制这个loader最先执行
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env' // 这里面就是把es6 -> es5的模块
                        ],
                        plugins: [
                            [
                                '@babel/plugin-proposal-decorators',
                                { 'legacy': true }
                            ],
                            [   // 支持类(class)的写法
                                '@babel/plugin-proposal-class-properties',
                                { 'loose': true } // 宽松模式
                            ],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
            },
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