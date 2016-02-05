import alt from '../alt';

class IssuesCompletedActions {
  constructor() {
    this.generateActions(
      'getIssuesCompletedSuccess',
      'getIssuesCompletedFail'
    );
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

export default alt.createActions(IssuesCompletedActions);