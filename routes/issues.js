/**
 * Gathers Issue data from Bitbucket API.
 * @module routes/issues
*/

import { getJSON, generateRandomNumber } from './utils';

'use strict';

module.exports = (app, _, config) => {
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
        issueData.id = generateRandomNumber();
        parsedData.push(issueData);
      });
      res.send(parsedData);
    });
  });

  /**
   * GET /api/issues/opened
   * Returns number of issues opened by each contributor in a repository.
  */
  app.get('/api/issues/opened', (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/', config)
    .then((results) => {
      let parsedData = [];
      let usernames = [];
      results['issues'].forEach((issue) => {
        let username = issue.responsible.username;
        if(!(_.contains(usernames, username))) {
          let entry = {};
          entry.username = username;
          entry.opened = 0;
          entry.id = null;
          parsedData.push(entry);
          usernames.push(username);
        }
        parsedData.forEach((contributor) => {
          if(contributor.username == issue.reported_by.username) {
              contributor.opened++;
          }
          contributor.id = generateRandomNumber();
        });
      });
      res.send(parsedData);
    });
  });
}