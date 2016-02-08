/**
 * Gathers Commit data from Bitbucket API.
 * @module routes/commits
*/

import { getJSON, generateRandomNumber, getDateRange, generateDateRange } from './utils';
import moment from 'moment';

'use strict';

/**
 * GET /api/commits
 * Returns commit data for a given repository.
*/
module.exports = (app, _, config) => {

  app.get('/api/count', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets/', config) 
    .then((data) => {
      res.send(data);
    });
  });

  app.get('/api/commits', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls(data.count, config);
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


  app.get('/api/weeklycommits', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0', config)
    .then((data) => {
      let promises = computeUrls(data.count, config);
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
            if (date.isBetween(ranges.startDate, ranges.endDate)) {
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

          if(!(_.contains(usernames, username))) {
            let userEntry = {};
            userEntry[username] = {};
            dateRanges.forEach((date) => {
              userEntry[username][date] = 0;
            });
            usernames.push(username);
            talliedCommits.push(userEntry);
          }

          talliedCommits.forEach((user) => {
            if(user[username] !== undefined) {
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
            if(username[user] !== undefined) {
              for(var key in username[user]) {
                userCommits.push(username[user][key]);
              }
            }
          });
          timeSeries.push(userCommits);
        });
        res.send(timeSeries);
      });
    });
  });

  /**
   * Helper function for computing all query urls.
   * 
   * @param {number} count - The number of commits in a repository.
   * @return {object} promises - An array of promises.
  */
  function computeUrls(count, config) {
    let urls = [];
    let page = 1;
    let stop;
    if(count >= 30) {
      stop = Math.floor(count / 30);
    } else {
      stop = 1;
    }
    let start = 0;

    while (start <= stop) {
      let url = 'https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/commits/master?page=' + page;
      urls.push(url);
      page++;
      start++;
    }

    let promises = urls.map((url) => getJSON(url, config));
    return promises;
  }
}