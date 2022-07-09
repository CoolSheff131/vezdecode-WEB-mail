let data = require('../data/small.json');

const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/mails', (req, res) => {
  res.send(data);
});

app.post('/mails/toggleread', (req, res) => {
  const ids = req.body.ids;
  data.forEach((item, id) => {
    if (ids.includes(id)) {
      item.read = !item.read;
    }
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
