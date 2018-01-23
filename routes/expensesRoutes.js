const mongoose = require('mongoose');
const Expense = mongoose.model('expenses');

module.exports = app => {
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
};