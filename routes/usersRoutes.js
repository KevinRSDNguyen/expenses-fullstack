const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
  //User login route
  app.post('/api/users/login', (req, res, next) => {
    passport.authenticate('local', { //1st param is name of strtgy, 2nd param is obj of options
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    })(req, res, next); 
  });

  //User register route
  app.post('/api/users/register', (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        res.send({error: 'User already exists'});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                res.send({user: user._id});
              })
              .catch(err => {
                res.status(422).send(err);
              });
          });
        });
      }
    })
  });

  app.get('/api/users/current_user', (req, res) => {
    if(req.user) {
      res.send(req.user.id);
    } else {
      res.send(req.user); //Sends nothing
    }
  });

  app.get('/api/users/logout', (req, res) => {
    req.logout();
    res.send('logged out');
  });
};