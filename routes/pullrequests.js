/**
 * Gathers Pull Request data from Bitbucket API.
 * @module routes/pullrequests
*/

import {getJSON, generateRandomNumber, isAuthenticated, computePullRequestUrls} from './utils';

'use strict';

/**
 * GET /api/pullrequests
 * Returns the number of pull requests per contributor on a repository.
*/
module.exports = (app, _, config) => {
  app.get('/api/pullrequests', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://api.bitbucket.org/2.0/repositories/' + username + '/' + reponame + '/pullrequests?state=[MERGED]', req.user.authToken)
    .then((results) => {
      let promises = computePullRequestUrls('https://api.bitbucket.org/2.0/repositories/', results.size, req.user.authToken, username, reponame);
      let usernames = [];
      let parsedData = [];
      let ids = [];
      Promise.all(promises)
      .then((pullRequests) => {
        pullRequests.forEach((pullRequest) => {
          pullRequest['values'].forEach((entry) => {
            if (!(_.contains(usernames, entry.author.username))) {
              let userData = {};
              userData.username = entry.author.username;
              userData.pullRequests = 0;
              userData.id = generateRandomNumber();
              parsedData.push(userData);
              usernames.push(entry.author.username);
            }
            parsedData.forEach((contributor) => {
              if (contributor.username === entry.author.username) {
                contributor.pullRequests++;
              }
            });
          });
        });
        res.send(parsedData);
      });
    });
  });
}