import alt from '../alt';
import PullRequestActions from '../actions/PullRequestActions';

class PullRequestStore {
  constructor() {
    this.bindActions(PullRequestActions);
    this.pullRequests = [];
  }

  onGetPullRequestsSuccess(data) {
    this.pullRequests = data;
  }

  onGetPullRequestsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText); 
  }
}

export default alt.createStore(PullRequestStore);