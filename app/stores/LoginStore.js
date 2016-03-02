import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.loggedIn = false;
  }

  onGetUserProfileSuccess(data) {
    this.username = data.user.username;
    this.loggedIn = true;
  }

  onGetUserProfileFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(LoginStore);