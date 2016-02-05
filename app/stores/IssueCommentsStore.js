import alt from '../alt';
import IssueCommentsActions from '../actions/IssueCommentsActions';

class IssueCommentsStore {
  constructor() {
    this.bindActions(IssueCommentsActions);
    this.issueComments = [];
  }

  onGetIssueCommentsSuccess(data) {
    this.issueComments = data;
  }

  onGetIssueCommentsFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(IssueCommentsStore);