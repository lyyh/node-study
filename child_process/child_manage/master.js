// 稳定性：未捕获的异常，发送自杀信号，在关闭进程前复制一个新进程。避免丢失请求
var fork = require('child_process').fork
var cpus = require('os').cpus()
var server = require('net').createServer()
server.listen(8000)
var workers = {}
for(var i = 0;i < cpus.length;i++){
	createWorker()
}
// server.listen(8000,function () {
// 	for(var pid of workers){
// 		workers[pid]
// 	}
// })
// server.on("message",function () {
//
// })


function createWorker () {
	var worker = fork(__dirname + '/worker.js')

	// on worker exit
	worker.on('exit',function () {
		console.log(`worker ${worker.pid} is closing`)
		delete workers[worker.pid]
		createWorker()
	})
	console.log(`Create worker process pid: ${worker.pid}`)
	// 句柄转发
	worker.send('server',server)
	workers[worker.pid] = worker
}



// 主进程退出时，让所有工作进程也一起退出
process.on('exit',function () {
	for(var pid in workers){
		workers[pid].kill()
	}
})

console.log(process.pid)
