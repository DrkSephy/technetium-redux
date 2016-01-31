// Route for iterating over all commits in a repo
'use strict';

module.exports = (app, request) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
  });

  app.get('/api/commits', (req, res) => {
    // Get number of commits in the repository
    getCount('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets')
    // Compute all urls
    .then((data) => {
      computeUrls(data);
      res.json(data);
    });

  });

  function getCount(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        let data = JSON.parse(body);
        resolve(data.count);
      });
    });
  }

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
      let url = 'https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/commits/master';
      urls.push(url);
      // page++;
      start++;
    }

    let promises = urls.map((url) => getJSON(url));
    Promise.all(promises)
      .then((results) => {
        results.forEach((item) => {
          console.log(item);
        });
      });

  }
}