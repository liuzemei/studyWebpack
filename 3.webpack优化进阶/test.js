var net = require('net')
 
// 检测端口是否被占用
function portIsOccupied (port) {
 // 创建服务并监听该端口
 var server = net.createServer().listen(port)
 
 server.on('listening', function () { // 执行这块代码说明端口未被占用
 server.close() // 关闭服务
 console.log('The port【' + port + '】 is available.') // 控制台输出信息
 })
 
 server.on('error', function (err) {
 if (err.code === 'EADDRINUSE') { // 端口已经被使用
  console.log('The port【' + port + '】 is occupied, please change other port.')
 }
 })
}
 
// 执行
portIsOccupied(8080)