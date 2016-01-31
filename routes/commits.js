// Route for iterating over all commits in a repo
'use strict';

module.exports = (app, request, _) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
  });

  app.get('/api/commits', (req, res) => {
    // Get number of commits in the repository
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets')
    // Compute all urls
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

              // Check if we created a data object for a contributor
              if(username !== undefined && !(_.contains(users, username))) {
                users.push(username);
                commitData[username] = {
                  commits: 0
                };
              }

              commitData[username].commits += 1;
            }
          });

          res.json(commitData);

        });
    });

  });

  function getJSON(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        let data = JSON.parse(body);
        resolve(data);
      });
    });
  }

  function computeUrls(count) {
    let urls = [];
    let page = 1;
    let stop = Math.floor(count / 30);
    let start = 0;

    while (start <= stop) {
      let url = 'https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/commits/master?page=' + page;
      urls.push(url);
      page++;
      start++;
    }

    let promises = urls.map((url) => getJSON(url));
    return promises;
  }
}