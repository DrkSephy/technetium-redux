import alt from '../alt';

class SubscriptionsActions {
  constructor() {
    this.generateActions(
      'addSubscriptionSuccess',
      'addSubscriptionFail',
      'updateUrl',
      'invalidUrl'
    );
  }

  addSubscription(url) {
    $.ajax({ 
      type: 'POST',
      url: '/api/subscribe',
      data: { url: url }
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