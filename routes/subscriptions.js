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
    let url = req.body.url;
    let subscription = new Subscriptions({
      url: url
    })

    subscription.save((err) => {
      if (err) return next(err);
      res.send({ message: 'Subscribed to: ' + url + ' successfully'});
    });
  });
}