const testSocketMethod = (socket, io) => {
    socket.on('TEST', async (data) => {
        console.log(`server test socket triggered`);
        
        socket.emit('TEST')
        
    })
}

module.exports = testSocketMethod