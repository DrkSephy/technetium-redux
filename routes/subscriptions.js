/**
 * Handles Repository Subscriptions.
 * @module routes/subscriptions
*/

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
      }
    });
  });

  /**
   * GET /api/users/remove
   * Removes all users from MongoDB.
  */
  app.get('/api/users/remove', (req, res, next) => {
    User.findOne({ field: 'name' }, (err, model) => {
      if (err) return next(err);
      User.remove((err) => {
        if (err) return next(err);
        res.send('Removed all users');
      });
    });
  });
}