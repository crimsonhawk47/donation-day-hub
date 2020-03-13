const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNum = req.body.phoneNum;
  const streetAddress = req.body.streetAddress;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const accessLevel = req.body.accessLevel;
  // const dateRegistered = req.body.dateRegistered;

//Make sure to install NOW plugin
  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, phone, street_address, city, state, zip, access_level, date_registered) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, now()) RETURNING id`;
  pool.query(queryText, [username, password, firstName, lastName, email, phoneNum, streetAddress, city, state, zip, accessLevel])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err)
    res.sendStatus(500)});
});

// PUT/UPDATE user from database with matching ID
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(`in router-side PUT/UPDATE`, req.body);
  console.log(`req.user.id =`, req.user.id);
  let queryText = `UPDATE "user"
  SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone" = $4, "street_address" = $5, "city" = $6, "state" = $7, "zip"= $8
  WHERE "id" = $9;
  `;
  pool.query(queryText, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.streetAddress,
  req.body.city, req.body.state, req.body.zip, req.user.id]).then(result =>{
    res.sendStatus(200);
  }).catch(error => {
    console.log(`Error making PUT/UPDATE query ${queryText}`, error);
    res.sendStatus(500);
  })

})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
