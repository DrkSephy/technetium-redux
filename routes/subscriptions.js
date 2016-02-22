/**
 * Handles Repository Subscriptions.
 * @module routes/subscriptions
*/

var Subscriptions = require('../models/subscriptions');

'use strict';

module.exports = (app) => {

  /**
   * POST /api/subscribe
   * Subscribes to a given repository.
  */
  app.post('/api/subscribe', (req, res, next) => {
    let username = req.body.username;
    let reponame = req.body.reponame;
    let subscription = new Subscriptions({
      username: username,
      reponame: reponame
    })

    subscription.save((err) => {
      if (err) return next(err);
      res.send({ message: 'Subscribed to: ' + username +  '/' + reponame + ' successfully'});
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