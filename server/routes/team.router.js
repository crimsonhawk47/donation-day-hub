const express = require('express');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//Admin - Get a list of all teams
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = 'SELECT * FROM "team" ORDER BY "is_archived" ASC, "date" DESC;'
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

//Admin - Get info on a specific team
router.get('/team-info/:id', rejectUnauthenticated, (req, res) => {


    const queryText = `SELECT "user".* FROM "user"
                        JOIN "team_user" ON "team_user".user_id = "user".id
                        JOIN "team" ON "team_user".team_id = "team".id
                        WHERE "team".id = $1
                        ORDER BY "access_level" DESC, "last_name" ASC`

    pool.query(queryText, [req.params.id])
    .then(result => {
        console.log(result.rows);
        
        res.send(result.rows)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
        
    })
    
})

//Volunteer - Gives list of teams for a user who hasn't joined a team yet. 
router.get('/search', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "team" WHERE "is_archived" = FALSE ORDER BY "captain_name" ASC;'
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        }).catch(error => {
            console.log('error in team search GET', error)
            res.sendStatus(500);
        })

});
//User - Join a specific Team
router.post('/join-team', rejectUnauthenticated, async (req, res) => {
    try {
        const teamId = req.body.data
        const userId = req.user.id

        //Link the user and team in the junction table
        let queryText = `INSERT INTO "team_user" ("team_id", "user_id")
                    VALUES ($1, $2)`
        await pool.query(queryText, [teamId, userId])
        //Set the users active_team column to the team ID
        queryText = `UPDATE "user"
                    SET "active_team" = $1
                    WHERE "user".id = $2`
        await pool.query(queryText, [teamId, userId])
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

router.put('/close-team/:id', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    try {
        const teamId = req.params.id
        //Archive the team
        const queryText = `UPDATE "team"
                        SET "is_archived" = true
                        WHERE "team".id = $1; 
                        `
        await pool.query(queryText, [teamId])

        //Revoke captain for all users of that team, and set their active team to 0
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