module.exports = (app) => {
  app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
  });
}