import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'getTokenSuccess',
      'getTokenFail'
    );
  }

  getToken() {
    console.log('Clicked');
    $.ajax({ url: '/login/bitbucket' })
    .done((data) => {
      console.log(data);
      this.actions.getTokenSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getTokenFail(jqXhr);
    });
  }
}

export default alt.createActions(LoginActions);