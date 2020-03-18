const testSocketMethod = (socket, io) => {
    socket.on('TEST', async (data) => {
        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        socket.emit('TEST')
        
    })
}

module.exports = testSocketMethod