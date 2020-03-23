const pool = require('../modules/pool')

const socketSendMessage = (socket, io, serverMethods) => {
    socket.on('SEND_MESSAGE', async (data) => {
        try {


        } catch (err) {
            console.log(`socketSendMessages Error:`);
            console.log(err);
            socket.emit('SERVER_ERROR', err)
        }

    })
}
module.exports = socketSendMessage