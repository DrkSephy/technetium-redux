import alt from '../alt';

class PullRequestActions {
  constructor() {
    this.generateActions(
      'getPullRequestsSuccess',
      'getPullRequestsFail'
    );
  }

  getPullRequests() {
    $.ajax({ url: '/api/pullrequests' })
      .done((data) => {
        this.actions.getPullRequestsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPullRequestsFail(jqXhr);
      })
  }
}

export default alt.createActions(PullRequestActions);