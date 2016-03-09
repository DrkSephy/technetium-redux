/**
 * Handles Repository Subscriptions.
 * @module routes/subscriptions
*/

var User = require('../models/users');
import { isAuthenticated } from './utils';

'use strict';

module.exports = (app) => {

  /**
   * POST /api/subscribe
   * Subscribes to a given repository.
  */
  app.post('/api/subscribe', isAuthenticated, (req, res, next) => {
    let username = req.body.username;
    let reponame = req.body.reponame;
    User.findOne({ username: username }, (err, user) => {
      if (err) return next(err);

      if (user) {
        let subscription = {
          username: username,
          reponame: reponame
        };
        user.subscriptions.push(subscription);
        user.save((err) => {
          if (err) return next(err);
          res.send({ message: 'Subscribed to: ' + username +  '/' + reponame + ' successfully'});
        });
      }
    });
  });

  /**
   * GET /api/users/remove
   * Removes all users from MongoDB.
  */
  app.get('/api/users/remove', isAuthenticated, (req, res, next) => {
    User.findOne({ field: 'name' }, (err, model) => {
      if (err) return next(err);
      User.remove((err) => {
        if (err) return next(err);
        res.send('Removed all users');
      });
    });
  });


  /**
   * GET /api/subscriptions
   * Returns the users subscriptions.
  */
  app.get('/api/subscriptions', isAuthenticated, (req, res, next) => {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) return next(err);

      if (user) {
        res.send(user.subscriptions);
      } else {
        res.send([]);
      }
    });
  });

  /**
   * GET /api/subscriptions/remove
   * Removes all repository subscriptions.
  */
  app.get('/api/subscriptions/remove', isAuthenticated, (req, res, next) => {
    User.findOne({ username: req.user.username }, (err, user) => {
      user.subscriptions = [];
      user.save((err) => {
        if (err) return next(err);
        res.send({ message: 'Unsubscribed to all repositories!'});
      });
    });
  });
}