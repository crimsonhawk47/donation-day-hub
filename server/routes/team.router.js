const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "team";'
    console.log('in team router.get')
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in team GET', error)
            res.sendStatus(500);
        })
            
});

router.get('/search', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "team" WHERE "is_archived" = FALSE ORDER BY "captain_name" ASC;'
    console.log('in team router.get/search')
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in team search GET', error)
            res.sendStatus(500);
        })
            
});


module.exports = router;