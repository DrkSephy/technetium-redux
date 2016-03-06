var Strategy = require('passport-bitbucket').Strategy;
var config = require('../secrets');
var User  = require('../models/users');

module.exports = function(passport) {
  passport.serializeUser((user, cb) => {
    console.log('-----------user-------------');
    console.log(user);
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  passport.use(new Strategy({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    callbackURL: 'http://127.0.0.1:3000/login/bitbucket/return'
  },(token, tokenSecret, profile, cb) => {
      User.findOne({ username: profile.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
          console.log('Username already exists!');
        } else {
          var newUser = new User({
            username: profile.username,
            authToken: token,
            subscriptions: []
          });

          newUser.save((err) => {
            if (err) return next(err);
            console.log('User profile has been created successfully!');
          });
        }

        User.find((err, users) => {
          if (err) return next(err);
          console.log(users);
        });
      });
      return cb(null, profile);
  }));
}