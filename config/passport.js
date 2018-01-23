const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    (email, password, done) => {
      //Match User
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false); //1st param is error,  2nd is user, 3rd is msg sent
        }

        //Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
    }
  ));

  passport.serializeUser(function(user, done) { //turn user to cookie
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) { //turn cookie back to user
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
