const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  createdAt: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'users'
  }
});

mongoose.model('expenses', ExpenseSchema);