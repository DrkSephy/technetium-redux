import alt from '../alt';

class IssuesAssignedActions {
  constructor() {
    this.generateActions(
      'getIssuesAssignedSuccess',
      'getIssuesAssignedFail'
    );
  }

  getIssuesAssigned() {
    $.ajax({ url: '/api/issues/assigned' })
      .done((data) => {
        this.actions.getIssuesAssignedSuccess(data);
        console.log(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssuesAssignedFail(jqXhr);
      });
  }
}

export default alt.createActions(IssuesAssignedActions);