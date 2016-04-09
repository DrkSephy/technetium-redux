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
      'invalidReponame'
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

  handleUnsubscribe(id) {
    $.ajax({
      type: 'GET',
      url: '/api/subscriptions/remove/single',
      data: {
        id: id
      }
    })
    .done((message) => {
      this.actions.handleUnsubscribeSuccess(message);
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
}

export default alt.createActions(SubscriptionManagerActions);