/**
 * Gathers Commit data from Bitbucket API.
 * @module routes/commits
*/

import { getJSON, generateRandomNumber } from './utils';

'use strict';

/**
 * GET /api/commits
 * Returns commit data for a given repository.
*/
module.exports = (app, _, config) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
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

  /**
   * Helper function for computing all query urls.
   * 
   * @param {number} count - The number of commits in a repository.
   * @return {object} promises - An array of promises.
  */
  function computeUrls(count, config) {
    let urls = [];
    let page = 1;
    let stop = Math.floor(count / 30);
    let start = 0;

    while (start < stop) {
      let url = 'https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/commits/master?page=' + page;
      urls.push(url);
      page++;
      start++;
    }

    let promises = urls.map((url) => getJSON(url, config));
    return promises;
  }
}