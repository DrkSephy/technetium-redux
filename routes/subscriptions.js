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
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) return next(err);

      if (user) {
        let subscription = {
          username: username,
          reponame: reponame.toLowerCase()
        };
        user.subscriptions.push(subscription);
        user.save((err) => {
          if (err) return next(err);
          console.log('New subscriptions');
          console.log(user.subscriptions)
          res.send({ message: 'Subscribed to ' + username +  '/' + reponame + ' successfully'});
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
   * GET /api/subscriptions/remove/single
   * Removes a single subscription.
  */
  app.get('/api/subscriptions/remove/single', isAuthenticated, (req, res, next) => {
    User.findOneAndUpdate(
      {username: req.user.username},
      {$pull: {'subscriptions': {'_id': req.query.id}}},
      {new: true},
      (err, doc) => {
        res.send({ message: 'Successfully unsubscribed from ' + req.query.username + '/' + req.query.reponame });
        // console.log(err);
        console.log(doc);
      }
    );
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