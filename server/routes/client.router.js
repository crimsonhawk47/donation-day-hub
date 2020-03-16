const express = require('express');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');


const router = express.Router();

//Admin Route
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const queryText = `SELECT * FROM "client";`
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

//User Route
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
    .then(() => {
      res.sendStatus(201);
      console.log(queryValues)
    }).catch((err) => {
      console.log('Error in router.post on client router', err);
      res.sendStatus(500);
    })
});

//User route
router.get('/list-of-images', (req, res) => {
  console.log(req.query);
  const client_id = req.query.client_id


  let queryText = `SELECT * FROM "media"
                  WHERE "client_id" = $1`
  let listOfImages = []
  pool.query(queryText, [client_id])
    .then(result => {
      for (row of result.rows) {
        listOfImages = [...listOfImages, row.link]
      }
      res.send(listOfImages)

    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)

    })

})

//User Route
router.post('/add-image-name', (req, res) => {
  
  const queryText = `INSERT INTO "media" ("client_id", "link", "type", "date")
                      VALUES ($1, $2, $3, NOW())`
  pool.query(queryText, [Number(req.query.client_id), req.query.Key, req.query.ContentType])
    .then(result => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })

})
// User route
router.post('/add', (req,res) => {
  console.log('is this team id?', req.teamById);

  console.log('we in post client server', req.body);
  const { name, bio, media_release, location, date, team_id } = req.body
  console.log('testing', name, bio, media_release, location, date, team_id);
  
  const queryText = `
  INSERT INTO "client" ("name", "bio", "media_release", "location", "date", "team_id")
  VALUES ($1, $2, $3, $4, $5, $6)
  `
  pool.query(queryText, [name, bio, media_release, location, date, team_id])
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})


router.get('/team/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  console.log(`in clients by team id`, id);
  const queryText =
    `
  SELECT * FROM "client"
  WHERE "team_id" = $1;
  `;

  pool.query(queryText, [id])
    .then(result => {
      res.send(result.rows)
    }).catch(error => {
      console.log('error in client get in your team view', error)
      res.sendStatus(500);
    })

})

router.get(`/list/:id`, (req, res) => {
  console.log(`we in server now`, req.params.id);
  let id = req.params.id
  const queryText = `
  SELECT * FROM "item"
  WHERE "client_id" = $1;
  `;
  pool.query(queryText, [id])
  .then((result) => {
    res.send(result.rows)
    console.log(result.rows);
    
  })
  .catch((error) => {
    console.log(`error in shopping list get in server`, error);
    res.sendStatus(500)
  })
})

module.exports = router;