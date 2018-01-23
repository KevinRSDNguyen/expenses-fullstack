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

//Fetch expenses
app.get('/api/expenses', (req, res) => {
  Expense.find()
    .then(expenses => {
      res.send(expenses);
    });
});

//Create an expense
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

//Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  Expense.remove({_id: req.params.id})
    .then(() => {
      res.send('Expense sucessfully removed');
    })
    .catch(err => {
      res.status(422).send(err);
    });
});

//Edit an expense
app.put('/api/expenses/:id', (req, res) => {
  Expense.findOne({_id: req.params.id})
  .then(expense => {

    //New Values
    expense.description = req.body.description;
    expense.note = req.body.note;
    expense.amount = req.body.amount;
    expense.createdAt = req.body.createdAt;

    expense.save()
    .then(expense => {
      res.send(expense);
    })
    .catch(err => {
      res.status(422).send(err);
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});