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
      'getIssuesCompletedFail'
    );
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
}

export default alt.createActions(ReportsActions);