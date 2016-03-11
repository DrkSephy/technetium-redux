var Strategy = require('passport-bitbucket').Strategy;
var config = require('../secrets');
var User  = require('../models/users');
var request = require('request');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {     
    done(null, user);
    // done(null, user.username);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
    // User.findOne({ username: username }, (err, user) => {
    //   done(err, user);
    // });
  });

  passport.use(new Strategy({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    callbackURL: 'http://127.0.0.1:3000/login/bitbucket/return'
  }, (token, tokenSecret, profile, cb) => {
      User.findOne({ username: profile.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
          var url = 'https://bitbucket.org/site/oauth2/access_token';
          var data = {
            'grant_type': 'refresh_token',
            'refresh_token': token,
            'client_id': config.consumerKey,
            'client_secret': config.consumerSecret
          }
          request.post({url: url, form: data}, (error, response, body) => {
            console.log(body);
          });
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