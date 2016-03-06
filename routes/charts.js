'use strict';

module.exports = (app, passport) => {
  app.get('/api/charts', (req, res) => {
    let data = {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    };
    res.send(data.columns);
  });
}