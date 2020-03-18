const pool = require('./pool')

const getMessagesByTeamId = async (teamId) => {
    try {
        const queryText = `SELECT "messages".*, "user".first_name, "user".last_name FROM "messages"
                            JOIN "user" ON "user".id = "messages".user_id
                            WHERE "team_id" = $1`
        const messages = await pool.query(queryText, [teamId])
        return Promise.resolve(messages)
    }
    catch (err) { return Promise.reject(err) }
}

const updateUsersMessages = async (userId) => {
    try {
        const userInfo = await getUserInfo(userId)
        const teamId = userInfo.active_team
        const messages = await getMessagesByTeamId(teamId)
        return Promise.resolve(messages)
    }
    catch (err) { return Promise.reject(err) }
}

const getUserInfo = async (userId) => {
    try {
        const queryText = `SELECT * FROM "user"
                            WHERE "user".id = $1`
        const result = await pool.query(queryText, [userId])
        const userInfo = result.rows[0]
        return Promise.resolve(userInfo)
    }
    catch (err) { return Promise.reject(err) }
}

module.exports = {
    getMessagesByTeamId,
    updateUsersMessages,
    getUserInfo,
}