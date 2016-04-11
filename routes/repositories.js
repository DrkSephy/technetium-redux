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
        getJSON('https://api.bitbucket.org/2.0/repositories/' + req.user.username, req.user.authToken)
        .then((results) => {
          let repos = [];
          let promises = computeRepositoryUrls('https://api.bitbucket.org/2.0/', results.size, req.user.authToken, req.user.username);
          Promise.all(promises)
          .then((repositories) => {
            repositories.forEach((repository) => {
              repository['values'].forEach((entry) => {
                if (entry.scm == 'git') {
                  let data = {}
                  data.subscribed = false;
                  data.name = entry.name;
                  data.username = entry.owner.username;
                  data.link = entry.links.html.href;
                  data.id = generateRandomNumber();
                  data.repoid = null;
                  user.subscriptions.forEach((subscription) => {
                    if (subscription.reponame == entry.name) {
                      data.subscribed = true;
                      data.repoid = subscription._id;
                    } 
                  });
                  repos.push(data);
                }
              });
            });
            res.send(repos);
          });
        });
      }
    });
  });
}