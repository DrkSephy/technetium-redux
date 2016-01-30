// Route for iterating over all commits in a repo
module.exports = (app, request) => {

  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', 
      (error, response, body) => {
        res.send(body);
    })
  });

  app.get('/api/commits', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets', 
      (error, response, body) => {
        var data = JSON.parse(body);
        console.log(data.count);
        res.json(data.changesets);
      });
  });

  function computeQueries() {
    var count;
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', 
      (error, response, body) => {
        console.log('hello');
        console.log(body.changesets);
    });
  }
}