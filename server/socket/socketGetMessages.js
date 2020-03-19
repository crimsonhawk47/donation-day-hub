const pool = require('../modules/pool')

const socketGetMessages = (socket, io, serverMethods) => {
    socket.on('GET_MESSAGES', async (data) => {
        try {
            const userId = socket.request.session.passport.user

            const messages = await serverMethods.getUsersMessages(userId)

            socket.emit('CLIENT_RECEIVED_MESSAGES', messages)


        } catch (err) {
            console.log(`socketGetMessages Error:`);
            console.log(err);
            socket.emit('SERVER_ERROR', err)
        }

    })
}
module.exports = socketGetMessages