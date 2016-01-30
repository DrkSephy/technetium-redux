module.exports = (app, request) => {
  app.get('/api/count', (req, res) => {
    request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/changesets/', (error, response, body) => {
      res.send(body);
    })
  });
}