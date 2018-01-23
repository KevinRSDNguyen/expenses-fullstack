const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

//Load models
require('./models/Expense');
require('./models/User');

//Passport Config
require('./config/passport')(passport);

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

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Load expenses routes
require('./routes/expensesRoutes')(app);
require('./routes/usersRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});