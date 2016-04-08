import alt from '../alt';
import SubscriptionManagerActions from '../actions/SubscriptionManagerActions';

class SubscriptionManagerStore {
  constructor() {
    this.bindActions(SubscriptionManagerActions);
    this.subscriptions = [];
  }

  onGetSubscriptionsSuccess(data) {
    this.subscriptions = data;
  }

  onGetSubscriptionsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onHandleUnsubscribeSuccess(message) {
    console.log(message);
  }

  onHandleUnsubscribeFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(SubscriptionManagerStore);