import alt from '../alt';

class SubscriptionManagerActions {
  constructor() {
    this.generateActions(
      'getSubscriptionsSuccess',
      'getSubscriptionsFail'
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
    });
  }
}

export default alt.createActions(SubscriptionManagerActions);