/**
 * Gathers Pull Request data from Bitbucket API.
 * @module routes/pullrequests
*/

import { getJSON, generateRandomNumber } from './utils';

'use strict';

/**
 * GET /api/pullrequests
 * Returns pull request data for a given repository.
*/

module.exports = (app, config) => {
  app.get('/api/pullrequests', (req, res) => {
    getJSON('https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/pullrequests/activity', config)
    .then((data) => {
      res.send(data);
    });
  });
}