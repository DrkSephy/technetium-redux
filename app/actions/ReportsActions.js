import alt from '../alt';
import _ from 'underscore';

class ReportsActions {
  constructor() {
    this.generateActions(
      'getCommitsSuccess',
      'getCommitsFail',
      'getIssuesOpenedSuccess',
      'getIssuesOpenedFail',
      'getIssuesAssignedSuccess',
      'getIssuesAssignedFail',
      'getIssuesCompletedSuccess',
      'getIssuesCompletedFail',
      'getIssuesCommentsSuccess',
      'getIssuesCommentsFail',
      'getReportDataSuccess',
      'getReportDataFail',
      'getReportPullRequestsSuccess',
      'getReportPullRequestsFail'
    );
  }

  getReportData() {
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
        $.ajax({ url: url })
          .done((data) => {
            resolve(data);
          });
      });
    });

    Promise.all(promises)
    .then((results) => {
      results.forEach((result) => {
        result.forEach((item) => {

          if(item.username && !(_.contains(usernames, item.username))) {
            let userData = {
              username: item.username,
              issuesOpened: 0, 
              issuesAssigned: 0,
              issuesClosed: 0,
              issuesComments: 0,
              commits: 0,
              pullRequests: 0,
              id: 0
            }
            parsedData.push(userData);
            usernames.push(item.username);
          }

          if(item.commits) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.commits = item.commits;
              }
            });
          }


          if(item.opened) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.issuesOpened = item.opened;
              }
            });
          }


          if(item.responsible) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.issuesAssigned = item.responsible;
              }
            });
          }


          if(item.completed) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.issuesClosed = item.completed;
              }
            });
          }

          if(item.comments) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.issuesComments = item.comments;
              }
            });
          }

          if(item.pullRequests) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.pullRequests = item.pullRequests;
              }
            })
          }

          if(item.id) {
            parsedData.forEach((user) => {
              if(user.username === item.username) {
                user.id = item.id;
              }
            });
          }
        });
      });
      this.actions.getReportDataSuccess(parsedData);
    });
    
  }

  getCommits() {
    $.ajax({ url: '/api/commits' })
      .done((data) => {
        this.actions.getCommitsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCommitsFail(jqXhr);
      });
  }

  getIssuesOpened() {
    $.ajax({ url: '/api/issues/opened' })
      .done((data) => {
        this.actions.getIssuesOpenedSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesOpenedFail(jqXhr);
      });
  }

  getIssuesAssigned() {
    $.ajax({ url: '/api/issues/assigned' })
      .done((data) => {
        this.actions.getIssuesAssignedSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesAssignedFail(jqXhr);
      });
  }

  getIssuesCompleted() {
    $.ajax({ url: '/api/issues/completed' })
      .done((data) => {
        this.actions.getIssuesCompletedSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesCompletedFail(jqXhr);
      });
  }

  getIssuesComments() {
    $.ajax({ url: '/api/issues/comments' })
      .done((data) => {
          this.actions.getIssuesCommentsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesCommentsFail(jqXhr);
      });
  }

  getPullRequests() {
    $.ajax({ url: '/api/pullrequests' })
      .done((data) => {
          this.actions.getReportPullRequestsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getReportPullRequestsFail(jqXhr);
      });
  }
}

export default alt.createActions(ReportsActions);