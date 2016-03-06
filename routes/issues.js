/**
 * Gathers Issue data from Bitbucket API.
 * @module routes/issues
*/

import {getJSON, generateRandomNumber, getIssueCommentUrls, getDateRange, generateDateRange, isAuthenticated} from './utils';
import moment from 'moment';

'use strict';

module.exports = (app, _, config) => {

/*---------------------------------------------------------
 *                    ISSUE API ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/issues
   * Returns issue data for a given repository.
  */
  app.get('/api/issues', isAuthenticated, (req, res) => {
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/', config)
    .then((results) => {
      let parsedData = [];
      results['issues'].forEach((issue) => {
        let issueData = {};
        issueData.reported_by = issue.reported_by.username;
        issueData.title = issue.title;
        if (issue.responsible) {
          issueData.responsible = issue.responsible.username;
        }
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
  app.get('/api/issues/opened', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let usernames = [];
      results['issues'].forEach((issue) => {
        if (issue.responsible) {
          let username = issue.responsible.username;
          if (!(_.contains(usernames, username))) {
            let entry = {};
            entry.username = username;
            entry.opened = 0;
            entry.id = null;
            parsedData.push(entry);
            usernames.push(username);
          }
          parsedData.forEach((contributor) => {
            if (contributor.username == issue.reported_by.username) {
                contributor.opened++;
            }
            contributor.id = generateRandomNumber();
          });
        }
      });
      res.send(parsedData);
    });
  });

  /**
   * GET /api/issues/opened/filtered
   * Returns number of issues opened in the last 7 days.
  */
  app.get('/api/issues/opened/filtered', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = {
        opened: 0,
        assigned: 0,
        resolved: 0
      };
      let ranges = getDateRange();
      results['issues'].forEach((issue) => {
        let date = moment(issue.created_on);
        if (date.isBetween(ranges.startDate, ranges.endDate)) {
          parsedData.opened++;

          if (issue.responsible) {
            parsedData.assigned++;
          }

          if (issue.status === 'resolved') {
            parsedData.resolved++;
          }
        }
      })
      res.send(parsedData);
    });
  });

  /**
   * GET /api/issues/assigned
   * Returns number of issues assigned to each contributor in a repository.
  */
  app.get('/api/issues/assigned', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let usernames = [];
      results['issues'].forEach((issue) => {
        if (issue.responsible) {
          let username = issue.responsible.username;
          if (!(_.contains(usernames, username))) {
            let entry = {};
            entry.username = username;
            entry.responsible = 0;
            entry.id = null;
            parsedData.push(entry);
            usernames.push(username);
          }
          parsedData.forEach((contributor) => {
            if (contributor.username == issue.responsible.username) {
                contributor.responsible++;
            }
            contributor.id = generateRandomNumber();
          });
        }
      });
      res.send(parsedData);
    });
  });

  /**
   * GET /api/issues/completed
   * Returns number of issues completed by each contributor in a repository.
  */
  app.get('/api/issues/completed', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let usernames = [];
      results['issues'].forEach((issue) => {
        if (issue.responsible) {
          let username = issue.responsible.username;
          if (!(_.contains(usernames, username))) {
            let entry = {};
            entry.username = username;
            entry.completed = 0;
            entry.id = generateRandomNumber();
            parsedData.push(entry);
            usernames.push(username);
          }
          parsedData.forEach((contributor) => {
            if (contributor.username == issue.responsible.username) {
              if (issue.status === 'resolved') {
                contributor.completed++;
              }
            }
          });
        }
      });
      res.send(parsedData);
    });
  });

  /**
   * GET /api/issues/comments
   * Returns number of total comments by each contributor in a repository.
  */
  app.get('/api/issues/comments', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((data) => {
      let promises = getIssueCommentUrls(data.count, config);
      Promise.all(promises)
      .then((results) => {
        let usernames = [];
        let parsedData = [];
        results.forEach((entry) => {
          if(entry.length > 0) {
            entry.forEach((issue) => {
              if(!(_.contains(usernames, issue.author_info.username))) {
                let userEntry = {};
                userEntry.username = issue.author_info.username;
                userEntry.comments = 0;
                userEntry.id = generateRandomNumber();
                parsedData.push(userEntry);
                usernames.push(issue.author_info.username);
              }
              parsedData.forEach((contributor) => {
                if(contributor.username == issue.author_info.username) {
                  contributor.comments++;
                }
              });
            });
          }
        });
        res.send(parsedData);
      }); 
    });
  });

/*---------------------------------------------------------
 *                SPARKLINE ISSUE API ROUTES
 *---------------------------------------------------------
*/

  /**
   * GET /api/issues/closed/sparkline
   * Returns the number of issues closed over 7 days to render a sparkline chart.
  */
  app.get('/api/issues/closed/sparkline', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let ranges = getDateRange();
      let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });
      results['issues'].forEach((issue) => {
        let date = moment(issue.utc_created_on);
        if (issue.responsible && issue.status === 'resolved' && date.isBetween(ranges.startDate, ranges.endDate)) {
          parsedData.forEach((entry) => {
            if ((entry.date) === date.format('YYYY-MM-DD')) {
              entry.count++;
            }
          });
        }
      });
      let data = [];
      parsedData.forEach((entry) => {
        data.push(entry.count);
      });
      res.send(data);
    });
  });

  /**
   * GET /api/issues/opened/sparkline
   * Returns an array of issues opened over 7 days to render a sparkline chart.
  */
  app.get('/api/issues/opened/sparkline', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let ranges = getDateRange();
      let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });
      results['issues'].forEach((issue) => {
        let date = moment(issue.created_on);
        if (date.isBetween(ranges.startDate, ranges.endDate)) {
          parsedData.forEach((entry) => {
            if ((entry.date) === date.format('YYYY-MM-DD')) {
              entry.count++;
            }
          });
        }
      });
      let data = [];
      parsedData.forEach((entry) => {
        data.push(entry.count);
      });
      res.send(data);
    });
  });

  /**
   * GET /api/issues/opened/assigned
   * Returns an array of issues assigned over 7 days to render a sparkline chart.
  */
  app.get('/api/issues/assigned/sparkline', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', config)
    .then((results) => {
      let parsedData = [];
      let ranges = getDateRange();
      let dateRanges = generateDateRange(ranges.startDate, ranges.endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });
      results['issues'].forEach((issue) => {
        let date = moment(issue.created_on);
        if (issue.responsible && date.isBetween(ranges.startDate, ranges.endDate)) {
          parsedData.forEach((entry) => {
            if ((entry.date) === date.format('YYYY-MM-DD')) {
              entry.count++;
            }
          })
        }
      });
      let data = [];
      parsedData.forEach((entry) => {
        data.push(entry.count);
      });
      res.send(data);
    });
  });
}