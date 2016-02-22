import alt from '../alt';

class SubscriptionsActions {
  constructor() {
    this.generateActions(
      'addSubscriptionSuccess',
      'addSubscriptionFail',
      'updateUsername',
      'invalidUsername',
      'updateReponame',
      'invalidReponame'
    );
  }

  addSubscription(username, reponame) {
    $.ajax({ 
      type: 'POST',
      url: '/api/subscribe',
      data: { 
        username: username,
        reponame: reponame 
      }
    })
    .done((data) => {
      this.actions.addSubscriptionSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.addSubscriptionFail(jqXhr.responseJSON.message);
    });
  }
}

export default alt.createActions(SubscriptionsActions);