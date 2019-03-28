/**
 * Created by anserliu on 2019/3/27.
 */
process.on('message',function (msg,server) {
	if(msg === 'server'){
		console.log(msg)
		server.on("connection",function (socket) {
			socket.end("handle by child")
		})
	}
})