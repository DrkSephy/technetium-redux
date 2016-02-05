import alt from '../alt';
import IssuesCompletedActions from '../actions/IssuesCompletedActions';

class IssuesCompletedStore {
  constructor() {
    this.bindActions(IssuesCompletedActions);
    this.issuesCompleted = [];
  }

  onGetIssuesCompletedSuccess(data) {
    this.issuesCompleted = data;
  }

  onGetIssuesCompletedFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(IssuesCompletedStore);