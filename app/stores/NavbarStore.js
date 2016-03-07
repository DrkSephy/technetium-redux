import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.subscriptions = [];
  }

  onGetSubscriptionsSuccess(data) {
    this.subscriptions = data;
  }

  onGetSubscriptionsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onRemoveSubscriptionsSuccess() {
    this.subscriptions = [];
  }

  onRemoveSubscriptionsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(NavbarStore);