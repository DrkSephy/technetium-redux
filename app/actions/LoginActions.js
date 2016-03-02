import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'getUserProfileSuccess',
      'getUserProfileFail'
    );
  }

  getUserProfile() {
    $.ajax({ url: '/profile' })
    .done((data) => {
      if (data.user) {
        this.actions.getUserProfileSuccess(data);
      }
    })
    .fail((jqXhr) => {
      this.actions.getUserProfileFail(jqXhr);
    });
  }
}

export default alt.createActions(LoginActions);