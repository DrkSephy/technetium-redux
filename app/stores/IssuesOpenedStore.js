import alt from '../alt';
import IssuesOpenedActions from '../actions/IssuesOpenedActions';

class IssuesOpenedStore {
  constructor() {
    this.bindActions(IssuesOpenedActions);
    this.issuesOpened = [];
  }

  onGetIssuesOpenedSuccess(data) {
    this.issuesOpened = data;
  }

  onGetIssuesOpenedFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(IssuesOpenedStore);