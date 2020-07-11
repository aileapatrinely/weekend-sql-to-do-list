const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log(`In /tasks GET`);

  let queryText = `SELECT * FROM "to-do" ORDER BY "complete" ASC;`;
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
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
    .query(queryText, [tasktoAdd.task, tasktoAdd.complete])
    .then((response) => {
      console.log(response);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const taskData = req.body;
  const queryText = `UPDATE "to-do" SET "complete"='Y'
      WHERE "id"=$1;`;
  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "to-do"
      WHERE "id"=$1;`;
  console.log(queryText);

  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

module.exports = router;
