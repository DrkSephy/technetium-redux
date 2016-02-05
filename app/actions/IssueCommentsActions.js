import alt from '../alt';

class IssueCommentsActions {
  constructor() {
    this.generateActions(
      'getIssueCommentsSuccess',
      'getIssueCommentsFail'
    );
  }

  getIssueComments() {
    $.ajax({ url: '/api/issues/comments' })
      .done((data) => {
        this.actions.getIssueCommentsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getIssueCommentsFail(jqXhr);
      });
  }
}

export default alt.createActions(IssueCommentsActions);