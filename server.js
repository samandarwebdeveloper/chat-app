const { Server } = require('socket.io')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000

app.use(express.static(__dirname + '/public'))

const server = app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
    socket.on('new-user', data => {
        socket.broadcast.emit('joined-user', data)
    })

    socket.on('new-message', data => {
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', data => {
        socket.broadcast.emit('user-disconnect', data)
    })
})