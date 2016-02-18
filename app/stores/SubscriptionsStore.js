import alt from '../alt';
import SubscriptionsActions from '../actions/SubscriptionsActions';

class SubscriptionsStore {
  constructor() {
    this.bindActions(SubscriptionsActions);
    this.url = '';
    this.helpBlock = '';
    this.urlValidationState = '';
  }

  onAddSubscriptionSuccess(successMessage) {
    this.urlValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddSubscriptionFail(errorMessage) {
    this.urlValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateUrl(event) {
    this.url = event.target.value;
    this.urlValidationState = '';
    this.helpBlock = '';
  }

  onInvalidUrl() {
    this.urlValidationState = 'has-error';
    this.helpBlock = 'Please enter a subscription url.';
  }
}

export default alt.createStore(SubscriptionsStore);