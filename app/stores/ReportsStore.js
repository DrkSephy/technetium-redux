import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.commits = [];
  }

  onGetCommitsSuccess(data) {
    this.commits = data;
  }

  onGetCommitsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(ReportsStore);