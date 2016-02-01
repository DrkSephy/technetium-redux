// Base url for issues: https://bitbucket.org/api/1.0/repositories/{username}/{reponame}/issues
'use strict';

module.exports = (app, request) => {

  app.get('/api/issues', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/')
    .then((results) => {
      let parsedData = [];
      results['issues'].forEach((issue) => {
        let issueData = {};
        issueData.reported_by = issue.reported_by.username;
        issueData.title = issue.title;
        issueData.responsible = issue.responsible.username;
        issueData.priority = issue.priority;
        issueData.metadata = issue.metadata.kind;
        parsedData.push(issueData);
      });
      res.send(parsedData);
    });
  });

  function getJSON(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        if(response.statusCode == 200) {
          let data = JSON.parse(body);
          resolve(data);
        } else {
          resolve({});
        }
      });
    });
  }
}