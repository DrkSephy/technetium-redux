// Babel ES6/JSX Compiler
require('babel-register');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('underscore');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-bitbucket').Strategy;

var routes = require('./app/routes');
var config = require('./secrets');
var User  = require('./models/users');

// Create the Express Application
var app = express();

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

passport.serializeUser((user, cb) => {
  console.log('-----------user-------------');
  console.log(user);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Connect to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/issues')(app, _, config);
require('./routes/commits')(app, _, config);
require('./routes/charts')(app);
require('./routes/timeseries')(app);
require('./routes/pullrequests')(app, _, config);
require('./routes/subscriptions')(app);

app.get('/login/bitbucket',
  passport.authenticate('bitbucket'));

app.get('/login/bitbucket/return', 
  passport.authenticate('bitbucket', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), () => 
  console.log('Express server listening on port ' + app.get('port')));

module.exports = app;