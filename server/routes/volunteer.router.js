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

//admin Make Captain
router.post('/make-captain', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    try {
        console.log(`YOU GOT TO MAKE CAPTAIN`);
        console.log(req.body.first_name);
        const name = req.body.first_name + ' ' + req.body.last_name
        const userId = req.body.id


        const makeTeamText = `INSERT INTO "team"
                        ("captain_name", "is_archived", "date")
                        VALUES ($1, FALSE, NOW())
                        RETURNING "id"`
        let makeTeamResponse = await pool.query(makeTeamText, [name])
        
        const newTeamId = makeTeamResponse.rows[0].id
        const putUserInTeamText = `INSERT INTO "team_user"
                                    ("team_id", "user_id")
                                    VALUES ($1, $2)`
        await pool.query(putUserInTeamText, [newTeamId, userId])
        const changeAccessLevel = `UPDATE "user"
                                    SET "access_level" = 2, "active_team" = $1
                                    WHERE "user".id = $2`
        await pool.query(changeAccessLevel, [newTeamId, userId])
        res.sendStatus(200)

    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }



})

module.exports = router;
