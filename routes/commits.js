// Route for iterating over all commits in a repo
module.exports = (app, request) => {
  app.get('/api/commits', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets', 
      (error, respond, body) => {
        res.send(body);
      });
  })
}