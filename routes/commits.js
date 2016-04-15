/**
 * Gathers Commit data from Bitbucket API.
 * @module routes/commits
*/

import {getJSON, generateRandomNumber, getDateRange, generateDateRange, computeUrls, isAuthenticated} from './utils';
import moment from 'moment';

'use strict';

module.exports = (app, _) => {

/*---------------------------------------------------------
 *                  COMMIT API ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/count
   * Returns the number of commits in a repository.
  */
  app.get('/api/count', isAuthenticated, (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/private-test/changesets/', req.user.authToken)
    .then((data) => {
      res.send(data);
    });
  });

  /**
   * GET /api/commits
   * Returns the number of commits in a repository per contributor.
  */
  app.get('/api/commits', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', req.user.authToken)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let users = []
        let parsedData = [];
        let commitData = [];
        results.forEach((item) => {
          item['values'].forEach((entry) => {
            commitData.push(entry.author);
          });
        });
        commitData.forEach((commit) => {
          var username;
          if (!commit.user) {
            username = commit.raw.split(' <')[0];
          } else {
            username = commit.user.username;
          }

          if(!(_.contains(users, username))) {
            users.push(username);
            let entry = {};
            entry.username = username;
            entry.commits = 0;
            entry.id = generateRandomNumber();
            parsedData.push(entry);
          }

          parsedData.forEach((contributor) => {
            if (contributor.username == username) {
              contributor.commits++;
            }
          });
        });

        res.json(parsedData);
      });
    });
  });

  /**
   * GET /api/commits/filtered
   * Returns the number of commits in a repository for the past 2 weeks.
  */
  app.get('/api/commits/filtered', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').unix();
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().unix();
    }

    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', req.user.authToken)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let parsedData = {
          commits: 0
        };
        results.forEach((result) => {
          result['values'].forEach((commit) => {
            let date = moment(commit.date).unix();
            if (date >= startDate && date <= endDate) {
              parsedData.commits++;
            }
          });
        });
      res.send(parsedData);
      });
    });
  });

  /**
   * GET /api/diffstat
   * Returns the lines of code per contributor in a repository.
  */
  app.get('/api/diffstat', isAuthenticated, (req, res) => {
    let usernames = [];
    let parsedData = [];
    let urls = []
    let hashes = [];
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0', req.user.authToken)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, req.user.authToken);
      Promise.all(promises)
      .then((results) => {

        results.forEach((item) => {
          item.values.forEach((dataset) => {

            if(!(_.contains(usernames, dataset.author.user.username))) {
              let userData = {
                username: dataset.author.user.username,
                commitHashes: [],
                diff: {
                  linesAdded: 0,
                  linesRemoved: 0
                }
              }
              parsedData.push(userData);
              usernames.push(dataset.author.user.username);
            }

            parsedData.forEach((contributor) => {
              if (!(dataset.message).includes('Merge')) {
                if(!(_.contains(hashes, dataset.hash))) {
                  hashes.push(dataset.hash);
                }
                if(contributor.username === dataset.author.user.username) {
                  contributor.commitHashes.push(dataset.hash);
                }
              }
            });
          });
        });

        hashes.forEach((hash) => {
          urls.push('https://api.bitbucket.org/1.0/repositories/DrkSephy/wombat/changesets/' + hash + '/diffstat');
        });

        let promises = urls.map((url) => getJSON(url, req.user.authToken));
        Promise.all(promises)
        .then((results) => {
          results.forEach((result) => {
            if (result.length > 0) {
              let location = _.findIndex(results, result);
              parsedData.forEach((contributor) => {
                if(_.contains(contributor.commitHashes, hashes[location])) {
                  result.forEach((datum) => {
                    contributor.diff.linesAdded += datum.diffstat.added;
                    contributor.diff.linesRemoved += datum.diffstat.removed;
                  });
                }
              })
            }
          });
          res.send(parsedData);
        });
      });
    });
  });

/*---------------------------------------------------------
 *                COMMIT TIMESERIES ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/weeklycommits
   * Bundles commit data to render timeseries chart.
  */
  app.get('/api/weeklycommits', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', req.user.authToken)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, req.user.authToken, username, reponame);
      let commits = [];
      Promise.all(promises)
      .then((results) => {
        let timeSeries = [];
        let users = [];
        let ranges = getDateRange();
        let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
        let parsedData = [];

        // Represent start and end range in unix time for easier comparisons
        let startRange = ranges.startDate.unix();
        let endRange = ranges.endDate.unix();

        // Group all commits together
        results.forEach((item) => {
          item['values'].forEach((commit) => {
            commits.push(commit);
          });
        });

        // Iterate over each commit
        commits.forEach((commit) => {
          // Grab username - either from raw or existing user field
          var username;
          if (!commit.author.user) {
            username = commit.author.raw.split(' <')[0];
          } else {
            username = commit.author.user.username;
          }

          const date = moment(commit.date);
          const dateUnix = date.unix();

          if (dateUnix >= startRange && dateUnix <= endRange) {
            let entry = {};
            entry.username = username;
            entry.date = date.format('YYYY-MM-DD');
            parsedData.push(entry);
          }
        });

        let usernames = [];
        let talliedCommits = [];

        parsedData.forEach((entry) => {
          let username = entry.username;

          if (!(_.contains(usernames, username))) {
            let userEntry = {};
            userEntry[username] = {};
            dateRanges.forEach((date) => {
              userEntry[username][date] = 0;
            });
            usernames.push(username);
            talliedCommits.push(userEntry);
          }

          talliedCommits.forEach((user) => {
            if (user[username] !== undefined) {
              user[username][entry.date]++;
            }
          });
        });

        dateRanges.unshift('x');
        timeSeries.push(dateRanges);
        usernames.forEach((user) => {
          let userCommits = [];
          userCommits.push(user);
          talliedCommits.forEach((username) => {
            if (username[user] !== undefined) {
              for (var key in username[user]) {
                if (!isNaN(username[user][key])) {
                  userCommits.push(username[user][key]);
                }
              }
            }
          });
          timeSeries.push(userCommits);
        });
        res.send(timeSeries);
      });
    });
  });

/*---------------------------------------------------------
 *              SPARKLINE COMMIT API ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/commits/sparkline
   * Returns an array of commits over the last 7 days to render a sparkline chart.
  */
  app.get('/api/commits/sparkline', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().format('YYYY-MM-DD');
    }

    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', req.user.authToken)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let parsedData = [];
        let dateRanges = generateDateRange(startDate, endDate);
        dateRanges.forEach((range) => {
          let entry = {
            date: range,
            count: 0
          }
          parsedData.push(entry);
        });
        results.forEach((result) => {
          result['values'].forEach((item) => {
            let date = moment(item.date);
            parsedData.forEach((entry) => {
              if ((entry.date) === date.format('YYYY-MM-DD')) {
                entry.count++;
              }
            });
          });
        });
        let data = [];
        parsedData.forEach((entry) => {
          data.push(entry.count);
        });
        res.send(data);
      });
    });
  });
}