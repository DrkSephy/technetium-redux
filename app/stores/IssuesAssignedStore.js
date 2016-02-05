import alt from '../alt';
import IssuesAssignedActions from '../actions/IssuesAssignedActions';

class IssuesAssignedStore {
  constructor() {
    this.bindActions(IssuesAssignedActions);
    this.issuesAssigned = [];
  }

  onGetIssuesAssignedSuccess(data) {
    this.issuesAssigned = data;
  }

  onGetIssuesAssignedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(IssuesAssignedStore);