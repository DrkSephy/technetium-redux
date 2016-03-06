/**
 * Gathers Commit data from Bitbucket API.
 * @module routes/commits
*/

import {getJSON, generateRandomNumber, getDateRange, generateDateRange, computeUrls, isAuthenticated} from './utils';
import moment from 'moment';

'use strict';

module.exports = (app, _, config, passport) => {

/*---------------------------------------------------------
 *                  COMMIT API ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/count
   * Returns the number of commits in a repository.
  */
  app.get('/api/count', isAuthenticated, (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets/', config) 
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
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, config, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let users = []
        let parsedData = [];
        results.forEach((item) => {
          const data = item.values;
          for (let value in data) {
            const username = data[value].author.user.username;
            if(username !== undefined && !(_.contains(users, username))) {
              let userEntry = {};
              userEntry.username = username;
              userEntry.commits = 0;
              userEntry.id = generateRandomNumber();
              parsedData.push(userEntry);
              users.push(username);
            }
            parsedData.forEach((contributor) => {
              if(contributor.username === username) {
                contributor.commits++;
              }
            });
          }
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
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, config, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let parsedData = {
          commits: 0
        };
        let ranges = getDateRange();
        let startDate = ranges.startDate.subtract(1, 'days');
        let endDate = ranges.endDate.add(1, 'days');
        results.forEach((result) => {
          result['values'].forEach((commit) => {
            let date = moment(commit.date);
            if (date.isBetween(startDate, endDate)) {
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
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, config);
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

        let promises = urls.map((url) => getJSON(url, config));
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
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, config, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let timeSeries = [];
        let users = [];
        let ranges = getDateRange();
        let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
        let parsedData = [];
        results.forEach((item) => {
          const data = item.values;
          for (let value in data) {
            let date = moment(data[value].date);
            if (date.isBetween(ranges.startDate.subtract(1, 'day'), ranges.endDate)) {
              let userEntry = {};
              userEntry.username = data[value].author.user.username;
              userEntry.date = date.format('YYYY-MM-DD');
              parsedData.push(userEntry);
            }
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
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls('https://api.bitbucket.org/2.0/repositories/', '/commits', data.count, config, username, reponame);
      Promise.all(promises)
      .then((results) => {
        let parsedData = [];
        let ranges = getDateRange();
        let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
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
            if (date.isBetween(ranges.startDate.subtract(1, 'day'), ranges.endDate)) {
              parsedData.forEach((entry) => {
                if ((entry.date) === date.format('YYYY-MM-DD')) {
                  entry.count++;
                }
              });
            }
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