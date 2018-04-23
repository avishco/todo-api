const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo  = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.post('/users', (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log('running on port 3000');
});