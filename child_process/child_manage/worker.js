// 发起连接就抛出异常

var http = require("http")
var server = http.createServer(function (req,res) {
		res.writeHead('200',{'Content-Type':'text/plain'})
		res.end(`handle by child,pid is ${process.pid}`)
		throw new Error("报错了!")
})

process.on('message',function (message,tcp) {
	if(message === 'server'){
		tcp.on('connection',function (socket) {
			server.emit('connection',socket)
		})
	}
})

process.on('uncatchException',function () {
	server.close(function () {
		process.exit(1)
	})
})
