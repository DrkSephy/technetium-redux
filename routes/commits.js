/**
 * Gathers Commit data from Bitbucket API.
 * @module routes/commits
*/

'use strict';

/**
 * GET /api/commits
 * Returns commit data for a given repository.
*/
module.exports = (app, request, _, config) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
  });

  app.get('/api/commits', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0')
    .then((data) => {
      let promises = computeUrls(data.count);
      Promise.all(promises)
      .then((results) => {
        let users = []
        let parsedData = [];
        let commitData = {}
        results.forEach((item) => {
          const data = item.values;
          for (let value in data) {
            const username = data[value].author.user.username;
            if(username !== undefined && !(_.contains(users, username))) {
              users.push(username);
              commitData[username] = {
                commits: 0
              };
            }
            commitData[username].commits += 1;
          }
        });

        parsedData.push(commitData);
        res.json(parsedData);

      });
    });
  });

  /** 
   * Helper function for returning JSON from url.
   *
   * @param {string} url - The url to query.
   * @return {object} data - JSON response from API.
  */
  function getJSON(url) {
    return new Promise((resolve, reject) => {
      request.get(url, { 'auth': { 'user': config.USERNAME, 'pass': config.PASSWORD}}, 
        (error, response, body) => {
          console.log('Status Code: ' + response.statusCode);
          if(response.statusCode == 200) {
            let data = JSON.parse(body);
            resolve(data);
          } else {
            resolve({});
          }
        });
    });
  }

  /**
   * Helper function for computing all query urls.
   * 
   * @param {number} count - The number of commits in a repository.
   * @return {object} promises - An array of promises.
  */
  function computeUrls(count) {
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

    let promises = urls.map((url) => getJSON(url));
    return promises;
  }
}