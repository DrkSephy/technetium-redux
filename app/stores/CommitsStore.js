import alt from '../alt';
import CommitsActions from '../actions/CommitsActions';

class CommitsStore {
  constructor() {
    this.bindActions(CommitsActions);
    this.commits = [];
  }

  onGetCommitsSuccess(data) {
    this.commits = data;
  }

  onGetCommitsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(CommitsStore);