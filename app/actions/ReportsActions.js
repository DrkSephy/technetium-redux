import alt from '../alt';

class ReportsActions {
  constructor() {
    this.generateActions(
      'getCommitsSuccess',
      'getCommitsFail',
      'getIssuesOpenedSuccess',
      'getIssuesOpenedFail'
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

  getIssues() {
    $.ajax({ url: '/api/issues/opened' })
      .done((data) => {
        this.actions.getIssuesOpenedSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesOpenedFail(jqXhr);
      });
  }
}

export default alt.createActions(ReportsActions);