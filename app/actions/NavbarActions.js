import alt from '../alt';

class NavbarActions {
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
}

export default alt.createActions(NavbarActions);