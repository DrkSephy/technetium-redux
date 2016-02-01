import alt from '../alt';
import IssuesActions from '../actions/IssuesActions';

class IssuesStore {
  constructor() {
    this.bindActions(IssuesActions);
    this.issues = [];
  }

  onGetIssuesSuccess(data) {
    this.issues = data;
  }

  onGetIssuesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }  
}

export default alt.createStore(IssuesStore);