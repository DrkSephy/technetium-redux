var Strategy = require('passport-bitbucket-oauth2').Strategy;
var config = require('../secrets');
var User  = require('../models/users');
var request = require('request');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {     
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    User.findOne({ username: username }, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new Strategy({
    clientID: config.consumerKey,
    clientSecret: config.consumerSecret,
    callbackURL: 'http://127.0.0.1:3000/login/bitbucket/return'
  }, (token, tokenSecret, profile, cb) => {
      User.findOne({ username: profile.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
          var url = 'https://bitbucket.org/site/oauth2/access_token';
          var data = {
            'client_id': config.consumerKey,
            'client_secret': config.consumerSecret,
            'refresh_token': user.refreshToken,
            'grant_type': 'refresh_token'
          }
          request.post({url: url, form: data}, (error, response, body) => {
            var data = JSON.parse(body);
            user.authToken = data['access_token'];
            user.refreshToken = data['refresh_token'];
            user.save((err) => {
              if (err) return next(err);
                console.log('Successfully updated user model with auth tokens!');
            });
          });
        } else {
          var newUser = new User({
            username: profile.username,
            authToken: token,
            refreshToken: tokenSecret,
            subscriptions: []
          });

          newUser.save((err) => {
            if (err) return next(err);
            console.log('User profile has been created successfully!');
          });
        }
      });
      return cb(null, profile);
  }));
}