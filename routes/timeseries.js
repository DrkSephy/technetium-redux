'use strict';

module.exports = (app, passport) => {
  app.get('/api/timeseries', (req, res) => {
    let data = {
      columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 340, 200, 500, 250, 350]
      ]
    };
    res.send(data.columns);
  });
}