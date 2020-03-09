const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "client";'
    console.log('in team router.get')
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in client GET', error)
            res.sendStatus(500);
        })
            
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in client post router');
    const newClient = req.body;
    console.log(newClient)
    const queryText = `INSERT INTO "client" ("name", "bio", "media_release", "location", "date", "team_id")
    VALUES ($1, $2, $3, $4, now(), $5);`;
    const queryValues = [
        newClient.name,
        newClient.bio,
        newClient.media_release,
        newClient.location,
        // newClient.date,
        newClient.team_id,
    ];
    pool.query(queryText, queryValues)
    .then(()=> {
        res.sendStatus(201);
        console.log(queryValues)
    }).catch((err) => {
        console.log('Error in router.post on client router', err);
        res.sendStatus(500);
    })
});

module.exports = router;