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

// Create the Express Application
var app = express();

passport.use(new Strategy({
    consumerKey: '6gzdExYccvG5j9gMXE',
    consumerSecret: 'AMbfpJuk8DP3dtdWsxztaapZrZqenbyW',
    callbackURL: 'http://127.0.0.1:3000/login/bitbucket/return'
  },(token, tokenSecret, profile, cb) => {
    console.log('---------token---------')
    console.log(token);
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  console.log('-----------user-------------');
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Connect to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
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

app.get('/loginSuccess', (req, res) => {
  res.send(req.user);
});

app.get('/login/bitbucket',
  passport.authenticate('bitbucket'));

app.get('/login/bitbucket/return', 
  passport.authenticate('bitbucket', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/loginSuccess');
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