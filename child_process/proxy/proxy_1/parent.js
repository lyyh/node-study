/**
 * Created by anserliu on 2019/3/27.
 */
var child = require('child_process').fork('./child.js')
var server = require('net').createServer()

server.on('connection',function (socket) {
	socket.end('handle by parent')
})

server.listen('8080',function () {
	console.log('start')
	child.send('server',server)
})
