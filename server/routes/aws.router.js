const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  generateGetUrl,
  generatePutUrl
} = require('../modules/AWSPresigner');

router.get('/list-of-images', (req, res) => {
  let queryText = `SELECT * FROM "media"`
  let listOfImages = []
  pool.query(queryText)
    .then(result => {
      console.log(result.rows);
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

router.get('/generate-get-url', (req, res) => {
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
router.get('/generate-put-url', (req, res) => {
  console.log(`IN PUT URL`);

  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } = req.query;
  generatePutUrl(Key, ContentType).then(putURL => {
    console.log(`displaying signed put url: `);
    console.log(putURL);

    res.send(putURL);
  })
    .catch(err => {
      console.log(`sending err ${err}`);

      res.send(err);
    });
});

module.exports = router
