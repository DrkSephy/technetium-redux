/**
 * Handles Repository Subscriptions.
 * @module routes/subscriptions
*/

var Subscriptions = require('../models/subscriptions');
var User = require('../models/users');

'use strict';

module.exports = (app) => {

  /**
   * POST /api/subscribe
   * Subscribes to a given repository.
  */
  app.post('/api/subscribe', (req, res, next) => {
    let username = req.body.username;
    let reponame = req.body.reponame;
    User.findOne({ username: username }, (err, user) => {
      if (err) return next(err);

      if (user) {
        user.subscriptions.push(reponame);
        user.save((err) => {
          if (err) return next(err);
          res.send({ message: 'Subscribed to: ' + username +  '/' + reponame + ' successfully'});
        });
        console.log(user.subscriptions);
      }
    });
  });

  /**
   * GET /api/subscriptions
   * Returns all repository subscriptions.
  */
  app.get('/api/subscriptions', (req, res, next) => {
    Subscriptions.find((err, subscription) => {
      if (err) return next(err);
      res.send(subscription);
    });
  }); 

  /**
   * GET /api/subscriptions/remove
   * Removes all repository subscriptions.
  */
  app.get('/api/subscriptions/remove', (req, res, next) => {
    Subscriptions.findOne({ field: 'name' }, (err, model) => {
      if (err) return next(err);
      Subscriptions.remove((err) => {
        if (err) return next(err);
        res.send('Removed all documents');
      });
    });
  });
}