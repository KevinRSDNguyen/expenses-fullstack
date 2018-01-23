const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');

//Load models
require('./models/Expense');
require('./models/User');

//Passport Config
require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session Middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Load expenses routes
require('./routes/expensesRoutes')(app);
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});