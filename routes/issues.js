/**
 * Gathers Issue data from Bitbucket API.
 * @module routes/issues
*/

import {getJSON, generateRandomNumber, getIssueCommentUrls, getDateRange, generateDateRange, isAuthenticated, computeIssueUrls} from './utils';
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
    getJSON('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/', req.user.authToken)
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
    getJSON('https://bitbucket.org/api/2.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let promises = computeIssueUrls('https://api.bitbucket.org/2.0/repositories/', '/issues', results.size, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((issues) => {
        let parsedData = [];
        let usernames = [];
        issues.forEach((issue) => {
          issue['values'].forEach((entry) => {
            // Get user who opened the issue
            if (entry.reporter) {
              let username = entry.reporter.username;
              if (!(_.contains(usernames, username))) {
                let data = {};
                data.username = username;
                data.opened = 0;
                data.id = null;
                parsedData.push(data);
                usernames.push(username);
              }
              parsedData.forEach((contributor) => {
                if (contributor.username == entry.reporter.username) {
                  contributor.opened++;
                }
                contributor.id = generateRandomNumber();
              })
            }
          });
        });
      res.send(parsedData);
      });
    });
  });

  /**
   * GET /api/issues/opened/filtered
   * Returns number of issues opened in the last 7 days.
  */
  app.get('/api/issues/opened/filtered', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').unix();
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().unix();
    }

    getJSON('https://bitbucket.org/api/2.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let parsedData = {
        opened: 0,
        assigned: 0,
        resolved: 0
      };

      // No issue tracker. break early and send empty data
      if (results.error) {
        res.send(parsedData);
      }

      let promises = computeIssueUrls('https://api.bitbucket.org/2.0/repositories/', '/issues', results.size, req.user.authToken, username, reponame);
      let issueData = [];
      Promise.all(promises)
      // Loop over all of the data!
      .then((issues) => {
        issues.forEach((issue) => {
          issue['values'].forEach((entry) => {
            issueData.push(entry);
          });
        });
        issueData.forEach((issue) => {
          let date = moment(issue.updated_on).unix();
          if (date >= startDate && date <= endDate) {
            parsedData.opened++;

            if (issue.assignee) {
              parsedData.assigned++;
            }

            if (issue.state === 'resolved') {
              parsedData.resolved++;
            }
          }
        });
        res.send(parsedData);
      });
    });
  });

  /**
   * GET /api/issues/assigned
   * Returns number of issues assigned to each contributor in a repository.
  */
  app.get('/api/issues/assigned', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/2.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let promises = computeIssueUrls('https://api.bitbucket.org/2.0/repositories/', '/issues', results.size, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((issues) => {
        let parsedData = [];
        let usernames = [];
        issues.forEach((issue) => {
          issue['values'].forEach((entry) => {
            // Get user who opened the issue
            if (entry.assignee) {
              let username = entry.assignee.username;
              if (!(_.contains(usernames, username))) {
                let data = {};
                data.username = username;
                data.responsible = 0;
                data.id = null;
                parsedData.push(data);
                usernames.push(username);
              }
              parsedData.forEach((contributor) => {
                if (contributor.username == entry.assignee.username) {
                  contributor.responsible++;
                }
                contributor.id = generateRandomNumber();
              })
            }
          });
        });
      res.send(parsedData);
      });
    });
  });

  /**
   * GET /api/issues/completed
   * Returns number of issues completed by each contributor in a repository.
  */
  app.get('/api/issues/completed', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/2.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let promises = computeIssueUrls('https://api.bitbucket.org/2.0/repositories/', '/issues', results.size, req.user.authToken, username, reponame);
      Promise.all(promises)
      .then((issues) => {
        let parsedData = [];
        let usernames = [];
        issues.forEach((issue) => {
          issue['values'].forEach((entry) => {
            // Get user who opened the issue
            if (entry.assignee) {
              let username = entry.assignee.username;
              if (!(_.contains(usernames, username))) {
                let data = {};
                data.username = username;
                data.completed = 0;
                data.id = null;
                parsedData.push(data);
                usernames.push(username);
              }
              parsedData.forEach((contributor) => {
                if (contributor.username == entry.assignee.username) {
                  if (entry.state == 'resolved') {
                    contributor.completed++;
                  }
                }
                contributor.id = generateRandomNumber();
              })
            }
          });
        });
      res.send(parsedData);
      });
    });
  });

  /**
   * GET /api/issues/comments
   * Returns number of total comments by each contributor in a repository.
  */
  app.get('/api/issues/comments', isAuthenticated, (req, res) => {
    let username = req.query.username;
    let reponame = req.query.reponame;
    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((data) => {
      let promises = getIssueCommentUrls(data.count, req.user.authToken, username, reponame);
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
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().format('YYYY-MM-DD');
    }

    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let parsedData = [];
      let dateRanges = generateDateRange(startDate, endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });

      // Break early if no issue tracker
      if (results.error) {
        res.send(parsedData);
      }

      results['issues'].forEach((issue) => {
        let date = moment(issue.utc_created_on);
        if (issue.responsible && issue.status === 'resolved') {
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
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().format('YYYY-MM-DD');
    }

    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      console.log(results);
      let parsedData = [];
      let dateRanges = generateDateRange(startDate, endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });

      // Break early if no issue tracker
      if (results.error) {
        res.send(parsedData);
      }

      results['issues'].forEach((issue) => {
        let date = moment(issue.created_on);
        parsedData.forEach((entry) => {
          if ((entry.date) === date.format('YYYY-MM-DD')) {
            entry.count++;
          }
        });
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
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // If no start date was supplied, set a default
    if (startDate == '') {
      startDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    }

    // If no end date was supplied, set a default
    if (endDate == '') {
      endDate = moment().format('YYYY-MM-DD');
    }

    getJSON('https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/issues/', req.user.authToken)
    .then((results) => {
      let parsedData = [];
      let dateRanges = generateDateRange(startDate, endDate);
      dateRanges.forEach((range) => {
        let entry = {
          date: range,
          count: 0
        }
        parsedData.push(entry);
      });

      // Break early if no issue tracker
      if (results.error) {
        res.send(parsedData);
      }

      results['issues'].forEach((issue) => {
        let date = moment(issue.created_on);
        parsedData.forEach((entry) => {
          if ((entry.date) === date.format('YYYY-MM-DD')) {
            entry.count++;
          }
        });
      });
      let data = [];
      parsedData.forEach((entry) => {
        data.push(entry.count);
      });
      res.send(data);
    });
  });
}