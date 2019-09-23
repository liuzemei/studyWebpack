


/*********************** 第八课 ***********************/
// webpack打包我们的图片
// 1. 在js中创建图片来引入
import testImg from './test.png';
let image = new Image();
image.src = testImg; // 缺少
document.body.appendChild(image);
// document

// 2. 在css引入 background('url')
import './a.less';
// 3. 在html中直接写入src


/*********************** 第七课 ***********************/
// import $ from 'jquery';

// console.log(window.$);
// console.log($);


/*********************** 第六课 ***********************/

// let str = require('./a.js')

// require('./index.css');
// require('./a.less');
// require('@babel/polyfill');

// console.log(str+'12');

// let fn = () => {
//     console.log(123);
// }

// fn();

// class A {
//     a = 1;
// }



// let a = new A();
// console.log(a.a);

// 'aaa'.includes('a');

// console.log('hello webpack');