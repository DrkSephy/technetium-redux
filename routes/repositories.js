/**
 * Retrives user's repositories.
 * @module routes/repositories
*/

var User = require('../models/users');
import {getJSON, computeRepositoryUrls, isAuthenticated, generateRandomNumber} from './utils';

'use strict';

module.exports = (app) => {
  app.get('/api/users/repositories', isAuthenticated, (req, res, next) => {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) return next(err);

      if (user) {
        getJSON('https://bitbucket.org/api/1.0/user/repositories/dashboard/', req.user.authToken)
        .then((results) => {
          let repos = [];
          results.forEach((result) => {
            let data = result[1];
            data.forEach((entry) => {
              if (entry.scm == 'git') {
                let repo = {};
                repo.subscribed = false;
                repo.name = entry.slug;
                repo.username = entry.owner;
                repo.link = 'https://bitbucket.org/' + entry.absolute_url;
                repo.id = generateRandomNumber();
                repo.repoid = null;
                user.subscriptions.forEach((subscription) => {
                  if (subscription.reponame == entry.slug && subscription.username == entry.owner) {
                    repo.subscribed = true;
                    repo.repoid = subscription._id;
                  }
                });
                repos.push(repo);
              }
            });
          });
          res.send(repos);
        });
      }
    });
  });
}