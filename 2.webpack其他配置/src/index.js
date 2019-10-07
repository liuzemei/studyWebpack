// console.log('home');

// let a = 1;
// console.log(1);


// class Log {
//     constructor() {
//         console.log('出错了');
//     }
// }

// let log = new Log();
// // console.lg();



// 第十一课. 跨域问题

// let xhr = new XMLHttpRequest();

// // 请求方法 请求路径 是否异步
// xhr.open('GET', '/user', true);

// xhr.onload = function(){
//     console.log('res :', xhr.response);
// }

// xhr.send();

// 第十二课. resolve属性问题

// import 'bootstrap';

// import './style';


// 第十三课  定义环境变量

let url = '';
// 开发环境和生产环境采用不一样的变量时，需要插入一个变量 
url = DEV ? 'http://localhost:3000' : 'http://www.liuzemei.com'

console.log(url);