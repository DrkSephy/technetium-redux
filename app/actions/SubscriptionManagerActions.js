import alt from '../alt';

class SubscriptionManagerActions {
  constructor() {
    this.generateActions(
      'getSubscriptionsSuccess',
      'getSubscriptionsFail',
      'handleUnsubscribeSuccess',
      'handleUnsubscribeFail'
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
}

export default alt.createActions(SubscriptionManagerActions);