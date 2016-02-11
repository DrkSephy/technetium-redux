import alt from '../alt';

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
      'getReportDataFail'
    );
  }

  getReportData() {
    let urls = [
      '/api/commits',
      '/api/issues/opened',
      '/api/issues/assigned',
      '/api/issues/completed',
      '/api/issues/comments'
    ];

    let data = [];

    let promises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        $.ajax({ url: url })
          .done((data) => {
            resolve(data);
          });
      });
    });

    Promise.all(promises)
    .then((data) => {
      console.log(data);
      this.actions.getReportDataSuccess(data);
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
}

export default alt.createActions(ReportsActions);