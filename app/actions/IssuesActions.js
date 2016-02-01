import alt from '../alt';

class IssuesActions {
  constructor() {
    this.generateActions(
      'getIssuesSuccess',
      'getIssuesFail'
    );
  }

  getIssues() {
    $.ajax({ url: '/api/issues' })
      .done((data) => {
        this.actions.getIssuesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesFail(jqXhr);
      });
  }
}

export default alt.createActions(IssuesActions);