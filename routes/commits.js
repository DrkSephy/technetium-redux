// Route for iterating over all commits in a repo
module.exports = (app, request) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
  });

  app.get('/api/commits', (req, res) => {
    getCount('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets')
    .then((data) => res.json(data));
  });

  function getCount(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        var data = JSON.parse(body);
        resolve(data.count);
      });
    });
  }
  
}