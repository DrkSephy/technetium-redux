import alt from '../alt';

class IssuesOpenedActions {
  constructor() {
    this.generateActions(
      'getIssuesOpenedSuccess',
      'getIssuesOpenedFailure'
    );
  }

  getIssuesOpened() {
    $.ajax({ url: '/api/issues/opened' })
      .done((data) => {
        this.actions.getIssuesOpenedSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesOpenedFailure(jqXhr);
      });
  }
}

export default alt.createActions(IssuesOpenedActions);