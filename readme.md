
分课笔记请见： `doc/`

# webpack4.0
## 第一课
### 1. 什么是webpack
webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其他的一些浏览器不能直接运行的拓展语言（scss，ts等），并将其打包为合适的格式以供浏览器使用。
可以做的事情：
> 代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布

### 2. 需要提前掌握的内容
- 需要node基础，以及npm的使用
- 掌握es6语法

### 3. 本课程最终掌握的webpack哪些内容
- webpack常见配置
- webpack高级配置
- webpack优化策略
- ast抽象语法树
- webpack中的Tapable
- 掌握webpack流程，手写webpack
- 手写webpack中常见的loader
- 手写webpack中常见的plugin

## 第二课
### webpack安装
- 安装本地的webpack
- npm install webpack webpack-cli -D
> `-D`的意思是开发依赖，上线后不需要打包

### webpack可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包（支持模块化）

### 手动配置 webpack
- 默认配置文件的名字 webpack.config.js
```js
let path = require('path');
console.log(path.resolve('dist'));
module.exports = {
    mode: 'production', // 模式 默认两种 production development
    entry: './src/index.js', //入口
    output: { // 出口
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径
    }
}
```

```js
!function (modules) {
    // 先定义一个缓存
    var installedModules = {};

    // 配置了 实现了 require    
    function __webpack_require__(moduleId) {
        // 检查一下模块是否在缓存中
        if (installedModules[moduleId]) return installedModules[moduleId].exports;

        // 不在缓存中，则开始安装模块,并推入缓存中
        var module = installedModules[moduleId] = {
            i: moduleId, // index
            l: !1,  // 是否加载完成
            exports: {}
        };
        // 执行这个模块函数
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports
    }
    __webpack_require__.m = modules,
        __webpack_require__.c = installedModules,
        __webpack_require__.d = function (e, t, r) {
            __webpack_require__.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
        },
        __webpack_require__.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 })
        },
        __webpack_require__.t = function (e, t) {
            if (1 & t && (e = __webpack_require__(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (__webpack_require__.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
                for (var o in e) __webpack_require__.d(r, o, function (t) { return e[t] }.bind(null, o));
            return r
        },
        __webpack_require__.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return __webpack_require__.d(t, "a", t), t
        },
        __webpack_require__.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        __webpack_require__.p = "",
        __webpack_require__(__webpack_require__.s = 0); // 入口模块
}(
    [
        function (module, exports, __webpack_require__) {
            let r = __webpack_require__(1); // 获取导出对象（其他的js文件）
            // 执行导出任务的逻辑
            console.log(r),
                console.log("hello webpack")
        },
        function (module, exports) {
            module.exports = "a" //  在这里完成了真正的对象导出。
        }
    ]
);
```
> 目前来看，其实webpack也就是自己实现了`module.exports`，然后通过加载入口模块，按照顺序加载其他的导出模块。

### 修改 webpack 的默认名字
比如说修改成`webpack.config.my.js`
- 第一种方法：
- 1. 命令行
`npx webpack --config webpack.config.my.js`
- 2. 修改package.json文件
```json
"script": {
    "build": "webpack --config webpack.config.my.js"
}
```

## 第三课
### webpack-dev-server
1. 安装
`yarn add webpack-dev-server -D`
2. 启动
`npx webpack-dev-server`
3. 配置 webpack
```js
module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000, // 启动端口
        progress: true, // 滚动条
        contentBase: './build', // 启动服务的路径
        compress: true, //压缩
    },
    entry: './src/index.js', //入口
    ...
}
```

4. 修改 package.json文件
```json
"script": {
    "dev": "webpack-dev-server"
}
```

### webpack-plugin
1. 安装插件
`yarn add html-webpack-plugin -D`
2. 在`webpack.config.js`中引入和使用插件
```js
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    ...,
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 打包的模板路径
            filename: 'index.html', // 打包之后的文件名
            minify: { // 格式化html文件
                removeAttributeQuotes: true, // 去除掉双引号
                collapseWhitespace: true // 变成1行
            },
            hash: true // 会在 js后面加上 [? + 哈希]
        })
    ],
    output: {
        ...,
        filename: 'index.[hash:8].js' // 这个地方也是在名字上加上哈希 后面的:8表示8位
    }
}
```

### 最终webpack.config.js
```js
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
    ]
}
```










## 第四课
### less/css Loader
1. 安装
`yarn add css-loader style-loader less-loader less -D`
2. 在 webpack.config.js 文件中 使用
```js
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
                        insert: function insertAtTop(element) { // 之前是insertAt，现在是一个函数或者elementString
                            var parent = document.querySelector('head');
                            var lastInsertedElement =
                                window._lastElementInsertedByStyleLoader;

                            if (!lastInsertedElement) {
                                parent.insertBefore(element, parent.firstChild);
                            } else if (lastInsertedElement.nextSibling) {
                                parent.insertBefore(element, lastInsertedElement.nextSibling);
                            } else {
                                parent.appendChild(element);
                            }
                            window._lastElementInsertedByStyleLoader = element;
                        },
                    }
                },
                'css-loader',
            ]
        },{
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
                }, // 以 link 标签的方式插入到指定标签中
                'css-loader', // 解析 @import
                'less-loader' // less -> css
            ]
        }
    ]
}
```
详情见：  `history/webpack.config.1.js`

## 第五课
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
> - 所有源码详情请见`webpack.config.2.js`

## 第六课
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
> 见 `webapck.config.3.js`

## 第七课
### 全局变量的引入(以jquery为例)
#### 1. 安装
`yarn add jquery`
#### 2. 使用
1. 直接使用
```js
import $ from 'jquery';
console.log($); // window.$ 不能使用
```
2. 使用 `expose-loader` 内联loader 
> 先`yarn add expose-loader -D`
```js
import $ from 'expose-loader?$!jquery'
console.log($) // ok
console.log(window.$) // ok
```
3. 配置到 `webpack.config.js` 文件里
```js
// module.rules[0] = 
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}
```
4. 将 jquery 注入到每个文件里
> 相当于不用require的方式引入，直接访问`$`
**修改webapck.config.js文件**
```js
let webpack = require('webpack');// 引入webapck插件
module.exports = {
    ...,
    plugins: [
        ...,
        new webapck.ProvidePlugin: {  // 全局注入插件
            $: 'jquery' // 在每个模块中都注入$符
        }
    ]
}
```
> 详情参见`webpack.config.4.js`

## 第八课
### 1. 在js和css中引入图片文件
1. 安装
`yarn add file-loader -D`
> 1. 默认会在内部生成一张图片 到build目录下
> 2. 把生成的图片的名字返回回来
2. 配置 `webpack.config.js`
```js
// module.rules[0]
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: 'file-loader'
}
```
### 2. 在html中直接通过src的方式引入图片文件
1. 安装
`yarn add html-withimg-loader -D`
2. 配置 `webpack.config.js`
```js

// module.rules[0]
{
    test: /\.html$/,
    use: 'html-withimg-loader'
}
```

### 3. 小图片的base64转化
> 减少http请求次数
一般来讲，我们不直接使用`file-loader`，而是先使用`url-loader`做一些限制，超出限制之后，再打包生成文件
```js
{
    test: /\.(png|jpg|jpeg|gif)$/,
    // 做一个限制 当我们的图片 小于 多少k 的时候 用 base64 来转化
    use: {
        loader: 'url-loader',
        options: { // 限制200k以内都转成base64, 否则就变成文件
            limit: 20 * 1024,
            outputPath: 'img/'
        }
    }
    
}
```
### 4. css 的文件抽离
在 `MiniCssExtractPlugin` 插件里的 `filename` 加上路径：
```js
new MiniCssExtractPlugin({
    filename: 'css/main.css'
})
```
> html / css / js 同理 ，都是改变filename的路径来抽离到文件夹内。

### 5. 公共路径的配置
> 当我们的代码运行到服务端，自动的加上域名的前缀
1. 修改 `webpack.config.js` 文件
```js
module.exports = {
    ...,
    outpt: {
        ...,
        publicPath: 'http://www.liuzemei.com'
    }
}
```
> html文件里的所有引入都会加上这个前缀。包括js、css以及其他所有资源文件。

### 6. 只针对图片加上公共服务器的引入
直接在上面`url-loader`的`options`里配置
```js
{
    limit: 20*1024,
    outputPath: 'img/',
    publicPath: 'http://www.liuzemei.com' // 只有图片加前缀
}
```

## 第九课
### 1. 多页应用
```js
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 1. 多页应用需要有多个js入口文件和出口文件
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
    // 2. 多页应用需要有多个html文件
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
    ]
}
```
注意：
> 1. `output`中的 `[name]`是指`entry`中的键值。
> 2. 需要`new`多个`HtmlWebpackPlugin`这个插件实例，其中指定`chunks`
> 3. `chunks`即时要打包的入口文件中的js文件

### 配置 source-map

## 第十课

