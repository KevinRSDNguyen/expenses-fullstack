const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Load models
require('./models/Expense');
const Expense = mongoose.model('expenses');

//Load keys
const keys = require('./config/keys');

//Map Global Promises
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect(keys.mongoURI);

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send('hello');
});

app.get('/api/expenses', (req, res) => {
  Expense.find()
    .then(expenses => {
      res.send(expenses);
    });
});

app.post('/api/expenses', (req, res) => {
  const newExpense = {
    description: req.body.description,
    amount: req.body.amount,
    note: req.body.note,
    createdAt: req.body.createdAt
  };
  new Expense(newExpense)
    .save()
    .then(expense => {
      res.send(expense);
    })
    .catch(err => {
      res.status(422).send(err);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});