const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    const queryText = `
    SELECT "captain_name" FROM "team"
    WHERE "id" = $1
    ;`;

    pool.query(queryText, [id])
        .then(result => {
            console.log(result.rows[0]);
            res.send(result.rows[0])
        }).catch(error => {
            console.log('error in team GET', error)
            res.sendStatus(500);
        })

});



module.exports = router;