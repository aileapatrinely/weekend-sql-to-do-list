const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log(`In /tasks GET`);

  let queryText = `SELECT * FROM "to-do" ORDER BY "complete" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET /tasks ${error}`);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(`In /tasks POST with`, req.body);

  const tasktoAdd = req.body;
  const queryText = `INSERT INTO "to-do" ("task", "complete")
                         VALUES ($1, $2);`;
  pool
    .query(queryText, [taskToAdd.task, taskToAdd.complete])
    .then((response) => {
      console.log(response);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
