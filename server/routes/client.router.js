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
router.get('/list-of-images', async (req, res) => {
  try {
    const client_id = req.query.client_id
    const queryText = `SELECT * FROM "media"
                  WHERE "client_id" = $1`
    const listOfImages = []
    const result = await pool.query(queryText, [client_id])
    res.send(result.rows)

  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }

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
  const { name, bio, media_release, location, date, team_id } = req.body
  
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

router.post('/item/add', (req, res) => {
  const {name, client_id, team_id, purchased} = req.body;

  const queryText = `
  INSERT INTO "item" ("name", "client_id", "team_id", "purchased" )
  VALUES ($1, $2, $3, $4);
  `;
  pool.query(queryText, [name, client_id, team_id, purchased])
  .then(result => {
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500)
  })
})

router.delete('/item/delete/:id', (req, res) => {
  console.log(`we in server for delete`, req.params.id);
  let id = req.params.id
  const queryText = 
  `
  DELETE FROM "item"
  WHERE "id" = $1;
  `;
  pool.query(queryText, [id])
  .then((result) => {
    res.sendStatus(200)
  })
  .catch((err) => {
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

router.put('/item/purchased/:id', (req, res) => {
  console.log(`we in server put for purchased`, req.params);
  id = req.params.id
  const queryText = `
  UPDATE "item"
  SET "purchased" = NOT "purchased"
  WHERE "id" = $1
  `
  pool.query(queryText, [id])
  .then((result) => {
    res.sendStatus(200)
  })
  .catch((error) => {
    res.sendStatus(500)
    console.log(`error in put for checked`, error);
    
  })
})

router.put(`/item/edit`, (req, res) => {
  console.log(`we in item put server`, req.body);
  const { id, name } = req.body;

  const queryText = `
  UPDATE "item"
  SET "name" = $1
  WHERE "id" = $2;
  `;
  pool.query(queryText, [name, id])
  .then((result) => {
    res.sendStatus(200)
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log(`error in put for item`, eroror);
    
  })
})

router.get(`/:id`, (req,res) => {
  console.log(`we in single client get now`, req.params.id);
  const id = req.params.id
  const queryText = `
  SELECT * FROM "client"
  WHERE "id" = $1;
  `;
  pool.query(queryText, [id])
  .then((result) => {
    res.send(result.rows[0])
    console.log(`single client from get`, result.rows);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log(`error in single client get`, error);
    
  })
})

router.get(`/list/:id`, (req, res) => {
  console.log(`we in server now`, req.params.id);
  let id = req.params.id
  const queryText = `
  SELECT * FROM "item"
  WHERE "client_id" = $1
  ORDER BY "name" ASC
  ;
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

router.put(`/update/:id`, (req, res) => {
  console.log(`update client params:`, req.params);
  console.log(`update client body`, req.body);
  const id = req.params.id
  const { name, bio, location, } = req.body
  const queryText = `
  UPDATE "client"
   SET "name" = $1,
   "bio" = $2,
   "location" = $3
  WHERE "id" = $4;
  `
  pool.query(queryText, [name, bio, location, id])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    res.sendStatus(500);
    console.log(`error in single client update`, err);
    
  })
})
router.get('/comment/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT comment FROM "client" WHERE "client".id = $1`
  const clientId = req.params.id
  pool.query(queryText, [clientId])
    .then(result => {
      console.log(result.rows)
      res.send(result.rows[0])
    }).catch(error => {
      console.log('error in client GET', error)
      res.sendStatus(500);
    })

});

router.put('/comment/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "client" SET "comment" = $1  WHERE "client".id = $2`
  const clientId = req.params.id
  console.log(req.body);
  
  pool.query(queryText, [req.body.comment, clientId])
    .then(result => {
      res.sendStatus(200)
    }).catch(error => {
      console.log('error in client GET', error)
      res.sendStatus(500);
    })

});

//Gives somebody admin access


module.exports = router;