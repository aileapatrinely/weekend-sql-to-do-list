const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const toDoRouter = require('./routes/to-do.router.js');

// Required for our POST requests to work
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', toDoRouter);

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
