const express = require('express');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = 'SELECT * FROM "user";'
    console.log('in volunteer router.get')
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in volunteer GET', error)
            res.sendStatus(500);
        })
});

// admin dashboard : targets individual volunteer/user from clicking 1 person on volunteer list
router.get('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `SELECT * FROM "user" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
