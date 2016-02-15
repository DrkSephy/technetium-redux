/**
 * Gathers Pull Request data from Bitbucket API.
 * @module routes/pullrequests
*/

import { getJSON, generateRandomNumber } from './utils';

'use strict';

/**
 * GET /api/pullrequests
 * Returns the number of pull requests per contributor on a repository.
*/
module.exports = (app, _, config) => {
  app.get('/api/pullrequests', (req, res) => {
    getJSON('https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/pullrequests?state=[MERGED]', config)
    .then((data) => {
      let usernames = [];
      let parsedData = [];
      data.values.forEach((result) => {
        if (!(_.contains(usernames, result.author.username))) {
          let userData = {};
          userData.username = result.author.username;
          userData.pullRequests = 0;
          userData.id = generateRandomNumber();
          parsedData.push(userData);
          usernames.push(result.author.username);
        }
        parsedData.forEach((contributor) => {
          if (contributor.username === result.author.username) {
            contributor.pullRequests++;
          }
        });
      });
      res.send(parsedData);
    });
  });
}