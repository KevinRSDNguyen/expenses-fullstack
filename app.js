const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');

//Load models.
require('./models/Expense');
require('./models/User');

//Passport Config
require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

//body-parser middleware
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
require('./routes/authRoutes')(app);
require('./routes/expensesRoutes')(app);


if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});