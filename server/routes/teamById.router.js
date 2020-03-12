const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    let id = req.user.id;
    
    const queryText = `
SELECT "user".id, "user".username, "team".captain_name, "team".id AS team_id FROM "user" 
JOIN "team_user" ON "user".id = "team_user".user_id
JOIN "team" ON "team".id = "team_user".team_id
WHERE "user".id = ${id} AND "team".is_archived = FALSE;`
;

    pool.query(queryText)
        .then(result => {
            console.log(result.rows[0]);
            res.send(result.rows[0])
        }).catch(error => {
            console.log('error in team GET', error)
            res.sendStatus(500);
        })

});



module.exports = router;