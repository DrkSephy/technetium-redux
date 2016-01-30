// Base url for issues: https://bitbucket.org/api/1.0/repositories/{username}/{reponame}/issues
module.exports = (app, request) => {
  app.get('/api/issues', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/issues/', 
      (error, response, body) => {
        res.send(body); 
      });
  });
}