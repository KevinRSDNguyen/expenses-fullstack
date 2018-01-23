const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Load models
require('./models/Expense');

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

//Load expenses routes
require('./routes/expensesRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});