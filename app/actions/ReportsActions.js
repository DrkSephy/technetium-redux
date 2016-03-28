import alt from '../alt';
import _ from 'underscore';

class ReportsActions {
  constructor() {
    this.generateActions(
      'getReportDataSuccess',
      'getReportDataFail',
      'getReportOpenedIssuesSuccess',
      'getReportOpenedIssuesFail',
      'getReportCommitsSuccess',
      'getReportCommitsFail',
      'getSparklineDataSuccess',
      'getSparklineDataFail',
      'getSparklineIssuesOpenedSuccess',
      'getSparklineIssuesOpenedFail',
      'getSparklineIssuesAssignedSuccess',
      'getSparklineIssuesAssignedFail',
      'getSparklineIssuesClosedSuccess',
      'getSparklineIssuesClosedFail',
      'setUsernameSuccess',
      'setUsernameFail',
      'setReponameSuccess',
      'setReponameFail'
    );
  }

  setUsername(username) {
    this.actions.setUsernameSuccess(username);
  }

  setReponame(reponame) {
    this.actions.setReponameSuccess(reponame);
  }

  getSparklineIssuesClosedData(username, reponame, startDate, endDate) {
    $.ajax({
      url: '/api/issues/closed/sparkline',
      data: {
        username: username,
        reponame: reponame,
        startDate: startDate,
        endDate: endDate
      }
    })
    .done((data) => {
      this.actions.getSparklineIssuesClosedSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getSparklineIssuesClosedFail(data);
    })
  }

  getSparklineIssuesAssignedData(username, reponame, startDate=null, endDate=null) {
    $.ajax({
      url: '/api/issues/assigned/sparkline',
      data: {
        username: username,
        reponame: reponame,
        startDate: startDate,
        endDate: endDate
      }
    })
    .done((data) => {
      this.actions.getSparklineIssuesAssignedSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getSparklineIssuesAssignedFail(data);
    });
  }

  getSparklineIssuesOpenedData(username, reponame, startDate=null, endDate=null) {
    $.ajax({
      url: '/api/issues/opened/sparkline',
      data: {
        username: username,
        reponame: reponame,
        startDate: startDate,
        endDate: endDate
      }
    })
    .done((data) => {
      this.actions.getSparklineIssuesOpenedSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getSparklineIssuesOpenedFail(jqXhr);
    });
  }

  getSparklineData(username, reponame) {
    $.ajax({
      url: '/api/commits/sparkline',
      data: {
        username: username,
        reponame: reponame
      }
    })
    .done((data) => {
      this.actions.getSparklineDataSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getSparklineDataFail(jqXhr);
    });
  }

  getFilteredCommits(username, reponame, startDate=null, endDate=null) {
    $.ajax({
        url: '/api/commits/filtered',
        data: {
          username: username,
          reponame: reponame,
          startDate,
          endDate
        }
      })
      .done((data) => {
        this.actions.getReportCommitsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getReportCommitsFail(jqXhr);
      });
  }

  getOpenedIssues(username, reponame, startDate=null, endDate=null) {
    $.ajax({
        url: '/api/issues/opened/filtered' ,
        data: {
          username: username,
          reponame: reponame,
          startDate: startDate,
          endDate: endDate
        }
      })
      .done((data) => {
        this.actions.getReportOpenedIssuesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getReportOpenedIssuesFail(jqXhr);
      });
  }

  getReportData(username, reponame) {
    let urls = [
      '/api/commits',
      '/api/issues/opened',
      '/api/issues/assigned',
      '/api/issues/completed',
      '/api/issues/comments',
      '/api/pullrequests'
    ];

    let parsedData = [];
    let usernames = []; 

    let promises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: {
              username: username,
              reponame: reponame
            }
          })
          .done((data) => {
            resolve(data);
          });
      });
    });

    Promise.all(promises)
    .then((results) => {
      results.forEach((result) => {
        result.forEach((item) => {

          if (item.username && !(_.contains(usernames, item.username))) {
            let userData = {
              username: item.username,
              issuesOpened: 0, 
              issuesAssigned: 0,
              issuesClosed: 0,
              issuesComments: 0,
              commits: 0,
              pullRequests: 0,
              linesAdded: 0,
              linesRemoved: 0,
              id: 0
            }
            parsedData.push(userData);
            usernames.push(item.username);
          }

          if (item.commits) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.commits = item.commits;
              }
            });
          }


          if (item.opened) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.issuesOpened = item.opened;
              }
            });
          }


          if (item.responsible) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.issuesAssigned = item.responsible;
              }
            });
          }


          if (item.completed) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.issuesClosed = item.completed;
              }
            });
          }

          if (item.comments) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.issuesComments = item.comments;
              }
            });
          }

          if (item.pullRequests) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.pullRequests = item.pullRequests;
              }
            })
          }

          if (item.diff) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.linesAdded = item.diff.linesAdded;
              }
            })
          }

          if (item.diff) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.linesRemoved = item.diff.linesRemoved;
              }
            });
          }

          if (item.id) {
            parsedData.forEach((user) => {
              if (user.username === item.username) {
                user.id = item.id;
              }
            });
          }
        });
      });
      this.actions.getReportDataSuccess(parsedData);
    }); 
  }
}

export default alt.createActions(ReportsActions);