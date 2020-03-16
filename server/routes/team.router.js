const express = require('express');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//Route for Admins
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
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

router.get('/team-info/:id', (req, res) => {


    const queryText = `SELECT "user".* FROM "user"
                        JOIN "team_user" ON "team_user".user_id = "user".id
                        JOIN "team" ON "team_user".team_id = "team".id
                        WHERE "team".id = $1`

    pool.query(queryText, [req.params.id])
    .then(result => {
        console.log(result.rows);
        
        res.send(result.rows)
    })
    .catch(err => {
        console.log(err);
        console.log(req.body);
        
        
    })
    
})

//Route for Users
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

router.post('/join-team', rejectUnauthenticated, (req, res) => {
    const teamId = req.body.data
    const userId = req.user.id
    console.log(userId);


    const queryText = `INSERT INTO "team_user" ("team_id", "user_id")
                    VALUES ($1, $2)`
    pool.query(queryText, [teamId, userId])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })


})

router.put('/close-team/:id', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    try {
        const teamId = req.params.id
        console.log(`IN CLOSE TEAM`);
        const queryText = `UPDATE "team"
                        SET "is_archived" = true
                        WHERE "team".id = $1; 
                        `
        await pool.query(queryText, [teamId])

        const closeTeam = `UPDATE "user" SET "active_team" = 0, "access_level" = 1
                                FROM "team_user"
                                WHERE "team_user".user_id = "user".id AND "team_user".team_id = $1`
        await pool.query(closeTeam, [teamId])
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)

    }
})


module.exports = router;