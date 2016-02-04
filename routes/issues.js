/**
 * Gathers Issue data from Bitbucket API.
 * @module routes/issues
*/

import { getJSON } from './utils';

'use strict';

module.exports = (app, config) => {
  /**
   * GET /api/issues
   * Returns issue data for a given repository.
  */
  app.get('/api/issues', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/', config)
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

  /**
   * GET /api/issues/opened
   * Returns issues that were opened by each contributor in 
   * a given repository.
  */
  app.get('/api/issues/opened', (req, res) => {
    res.send('Opened issues per contributor');
  });
}