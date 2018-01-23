const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //creates cookie for us from a user
  done(null, user.id); // dont use googles id since maybe multiple oauths from fb, etc
});

passport.deserializeUser((id, done) => { //turn cookie back to user
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        //route user will be sent to after granting permission
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser) {
          return done(null, existingUser);
        }  
        const user = await new User({googleId: profile.id}).save();
        done(null, user);
      }
    )
);