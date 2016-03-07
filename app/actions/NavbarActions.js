import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getSubscriptionsSuccess',
      'getSubscriptionsFail',
      'removeSubscriptionsSuccess',
      'removeSubscriptionsFail'
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

  removeSubscriptions() {
    $.ajax({ url: '/api/subscriptions/remove' })
    .done((data) => {
      this.actions.removeSubscriptionsSuccess();
    })
    .fail((jqXhr) => {
      this.actions.removeSubscriptionsFail(jqXhr);
    });
  }
}

export default alt.createActions(NavbarActions);