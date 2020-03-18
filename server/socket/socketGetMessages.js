const pool = require('../modules/pool')

const socketGetMessages = (socket, io) => {
    socket.on('GET_MESSAGES', async (data) => {
        try {
            console.log(`server test socket triggered`);
            const userId = socket.request.session.passport.user


            const getMessagesText = `SELECT "messages".* FROM "user"
                            JOIN "team" ON "team".id = "user".active_team
                            JOIN "messages" ON "team".id = "messages".team_id
                            WHERE "user".id = $1`

            const messages = await pool.query(getMessagesText, [userId])

            socket.emit('CLIENT_RECEIVED_MESSAGES', messages)
        } catch (err) {
            console.log(`socketGetMessages Error:`);
            console.log(err);
            socket.emit('SERVER_ERROR', err)
        }

    })
}

module.exports = socketGetMessages