import alt from '../alt';

class SubscriptionManagerActions {
  constructor() {
    this.generateActions(
      'getSubscriptionsSuccess',
      'getSubscriptionsFail',
      'handleUnsubscribeSuccess',
      'handleUnsubscribeFail',
      'addSubscriptionSuccess',
      'addSubscriptionFail',
      'updateUsername',
      'invalidUsername',
      'updateReponame',
      'invalidReponame',
      'getRepositoriesSuccess',
      'getRepositoriesFail'
    );
  }

  getSubscriptions() {
    $.ajax({ url: '/api/subscriptions' })
    .done((data) => {
      this.actions.getSubscriptionsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getSubscriptionsFail(jqXhr);
    });
  }

  handleUnsubscribe(id, username, reponame) {
    $.ajax({
      type: 'GET',
      url: '/api/subscriptions/remove/single',
      data: {
        id: id,
        username: username,
        reponame: reponame
      }
    })
    .done((data) => {
      this.actions.handleUnsubscribeSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.handleUnsubscribeFail(jqXhr);
    });
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

  getRepositories() {
    $.ajax({
      type: 'GET',
      url: '/api/users/repositories'
    })
    .done((data) => {
      this.actions.getRepositoriesSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getRepositoriesFail(jqXhr.responseJSON.message);
    })
  }
}

export default alt.createActions(SubscriptionManagerActions);