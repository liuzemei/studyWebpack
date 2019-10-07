
分课笔记请见： `doc/`

正在努力更新中......

> 你的star是作者最好的动力...谢谢

# webpack4.0
# 第一章 基础配置
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

# 第二章 其他配置
## 第一课
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

## 第二课
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

## 第三课
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


> 详情请见`2.webpack其他配置/histroy/webpack.config.1....js`

### 2. 配置 source-map(源码映射)
> 源码映射的作用是会单独生成一个souce-map文件，出错了会标识当前报错的列和行（文件源码）
1. `souce-map` 直接在`webpack.config.js`中使用
```js
module.exports = {
    ...,
    devtool: 'source-map' // 增加映射文件 可以帮我们调试源代码
}
```
2. `eval-source-map` 用法同上
> 不会产生单独的文件 但是可以显示行和列
```js
module.exports = {
    ...,
    devtool: 'eval-source-map' // 增加映射文件 可以帮我们调试源代码
}
```
3. `cheap-module-source-map` 用法同上
> 不会产生列 但是是一个单独的映射文件，只是可以保存下来
4. `cheap-module-eval-source-map` 用法同上
> 不会产生文件，集成在打包后的文件中（也不会产生列）

> 详情请见`2.webpack其他配置/histroy/webpack.config.2....js`

 ### 3. watch属性
 ```js
module.exports = {
    ...,
    watch: true,
    watchOptions: { // 监控的选项
        poll: 1000, // 每秒 问我 1000次 需要更新吗？比较合理的是1000...
        aggregateTimeout: 500, // 防抖的作用 我一直输入代码后 500ms 内是不重新打包的。
        ignored: /node_modules/ // 不需要进行监控哪个文件
    },
}
 ```
 > 把webpack变成了 webpack-dev-server 相当于就是实时动态打包编译

> 详情请见`2.webpack其他配置/histroy/webpack.config.3....js`
 
 

## 第四课
> webpack的小插件
### cleanWebpackPlugin
> 每次build之前都先把dist文件目录下删干净
1. 安装插件
`yarn add clean-webpack-plugin -D`
2. 在`webpack.config.js`中使用
```js
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    ...,
    plugins: [
        new CleanWebpackPlugin() // 啥都不用传
    ]
}
```
### copyWebpackPlugin
> 把其他的一些目录的文件拷贝到dist目录下
1. 安装
`yarn add copy-webpack-plugin -D`
2. 使用 
```js
let CopyWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    ...,
    plugins: [
        new CopyWebpackPlugin([
            {from: './public', to: './dist'}
        ]) // 传入要清空的路径
    ]
}
```


### bannerPlugin(内置)
> 功能：在每个js文件中插入版权声明（其实就是在前面加上一段注释...)
1. 安装
> 不用安装，webpack内置的插件
2. 使用
```js
let webpack = require('webpack');

module.exports = {
    ...,
    plugins: [
        new webpack.BannerPlugin('make 2019 by lzm') // 插入版权声明
    ]
}
```

> 详情请见`2.webapck其他配置/history/webpack.config.4.3个小插件.js`



## 第五课
### 跨域问题
> 解决跨域问题的几种思路
> 1. 通过配置客户端`webpack`来进行代理转发。
> 2. 通过把客户端和服务器启动到同一服务器同一端口来进行避免跨域操作。
> 3. 通过配置服务端来进行跨域()

#### 1. 客户端`webpakck`配置
> 前提要用例如`express`的服务端框架来启动一个服务。本文中启动服务监听端口为3000
```js
module.exports = {
    ..., 
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000' // 凡是以请求/api开头的，都用代理服务器转发
        }
    }
}
```

#### 2. `webpack`的高级配置
```js
module.exports = {
    ..., 
    devServer: {
        proxy: {// 重写的方式 把请求代理到express服务器上
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api': '' // 把/api替换成空
                }
            }
        }
    }
}
```
#### 3.模拟数据
原理是其实`dev-server`本身就是基于`express`环境
```js
module.exports = {
    ..., 
    devServer: {
        before(app) { // 提供的方法 钩子
            app.get('/api/user', (req,res) => {
                res.json({name: 'LZM-before'})
            })
        }
    }
}
```

#### 4. 服务端启用中间件 前后端公用一个端口
1. 安装 中间件
`yarn add webpack-dev-middleware -D`
2. 在`webapck.config.js`同级目录下新建一个 `server.js` 文件
```js
const express  = require('express');
const app = express();
const webpack = require('webpack');
const middle = require('webpack-dev-middleware');
const config = require('./webpack.config.js'); // 指向 webpack配置文件
const compiler = webpack(config);

app.use(middle(compiler)); // 使用中间件，运行服务时，同时启动webpack
app.get('/user', (req,res) => {
    res.json({name: 'LZM1'})
})
app.listen(3000);
```
3. 启动服务
`node server.js`

## 第六课
### resolve属性的配置
#### 1. `node_modules`模块的查找
默认情况下， `commonjs`寻找第三方模块，是向上遍历目录树找`node_modules`。
```js
module.exports = {
    ...,
    resolve: {
        // 在 common 规范中 会遍历上层路径找 node_modules
        modules: [path.resolve('node_modules')] // 不去上级目录找了，只在当前目录找node_modules
    }
}
```
#### 2. 别名的引入。
`commonjs`寻找到第三方模块时，默认会执行以下操作：
1. 先找到`package.json`文件
2. 在`package.json`文件中，找到`main`字段，并解析值路径的文件

> 别名的引入可以让`commonjs`寻找到第三方模块的时候，加载指定文件
```js
module.exports = {
    ...,
    resolve: {
        alias: { // 别名 
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
            // 在 项目中 import 'bootstrap' --> 相当于 import了后面一长串,即，不会去找package.json中main的路径了，而是直接找到后边的一长串指定的路径。
        }
    }
}
```

#### 3. 修改默认的优先级
>如果嫌别名的引入还是太麻烦了。可以修改默认的优先级。不过也有条件，需要`package.json`文件中有相应的模块加载路径.

如`bootstrap`中的package.json中，有如下字段:
```json
{
  "style": "dist/css/bootstrap.css",
  "sass": "scss/bootstrap.scss",
  "main": "dist/js/bootstrap"
}
```
上文已经提到，默认是加载`main`模块，现在，我们可以修改这个优先级，达到当你`import 'bootstrap'`的时候，优先加载`style`模块，以达到跟上文别名一样的效果
```js
module.exports = {
    ...,
    resolve: {
        mainFields: ['style', 'main'] // 找到package.json文件后，先找style模块，如果没有的话，就找main模块
    }
}
```

#### 4. 指定入口文件的名字
> 如果没有指定，即`package.json`中，没有`main`模块，则默认加载`index.js`
不过几乎没有应用场景
```js
module.exports = {
    ...,
    resolve: {
        mainFiles: ['index.js']
    }
}
```
#### 5. 设置默认引入后缀名
> 当引入自己的模块，不加后缀的时候，默认会识别成`js`文件。如果是其他类型的文件，则会报错。
所以，我们希望能够直接引入文件，而自动的匹配上后缀名。
```js
module.exports = {
    ...,
    resolve: {
        extensions: ['.vue', '.js', '.css'] // 当没有后缀名的时候，优先匹配vue 然后匹配 js  最后匹配css
    }
}
```


## 第七课
### 定义环境变量
```js
const webpack = require('webpack');
module.exports = {
    ...,
    plugins: [
        new webpack.DefinePlugin({
            DEV: "'production'", // 这里直接parse了一层，所以需要两层包住...
            DEV1: JSON.stringify('production'), // 我们经常这样用，避免上面的写法...
            FLAG:  'true'// 注意，boolean值 和 数字 ，可以直接用单引号表示，去掉单引号才正确。否则加上双引号就变成了字符串了。
        })
    ]
}
```

### 区分不同环境
1. 将`webpack.config.js`更名为`webpack.base.js`
2. 同级目录下新建两个文件`webpack.prod.js`和`webpack.dev.js`
3. 安装插件`webpack-merge`
`yarn add webpack-merge -D`
4. 编辑`webpack.dev.js`文件
```js
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = smart(base, {
    mode: 'development'
})
```
5. 编辑`webpack.prod.js`文件
```js
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = smart(base, {
    mode: 'production'
})
```
6. 修改`package.json`文件，修改dev 和 build的文件指向
```json
{
    ...,
    "scripts": {
        "dev": "webpack-dev-server --config webpack.dev.js",
        "build": "webpack --config webpack.prod.js"
    },
}
```
我们就已经完成了`development`和`production`的区分了。


# 第三章
## 第一课


## 第二课


## 第三课


## 第四课


## 第五课


## 第六课


## 第七课


## 第八课



## 第九课