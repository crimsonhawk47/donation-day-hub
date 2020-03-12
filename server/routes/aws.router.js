const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const {
  generateGetUrl,
  generatePutUrl
} = require('../modules/AWSPresigner');



router.get('/generate-get-url', rejectUnauthenticated, (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  console.log(`IN GET URL`);
  const { Key } = req.query;



  generateGetUrl(Key)
    .then(getURL => {
      console.log(`displaying signed url for image:`);
      console.log(getURL);

      res.send(getURL);
    })
    .catch(err => {
      res.send(err);
    });
});

// PUT URL
router.get('/generate-put-url', rejectUnauthenticated, (req, res) => {
  console.log(`IN PUT URL`);

  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } = req.query;
  generatePutUrl(Key, ContentType)
    .then(putURL => {
      res.send(putURL);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router
