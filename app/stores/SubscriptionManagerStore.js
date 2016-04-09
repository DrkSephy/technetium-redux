import alt from '../alt';
import SubscriptionManagerActions from '../actions/SubscriptionManagerActions';

class SubscriptionManagerStore {
  constructor() {
    this.bindActions(SubscriptionManagerActions);
    this.subscriptions = [];
    this.username = '';
    this.reponame = '';
    this.helpBlock = '';
    this.usernameValidationState = '';
    this.reponameValidationState = '';
  }

  /* Recent Subscriptions Table */
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

  /* Subscription Form Actions */
  onAddSubscriptionSuccess(successMessage) {
    this.usernameValidationState = 'has-success';
    this.reponameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddSubscriptionFail(errorMessage) {
    this.usernameValidationState = 'has-error';
    this.reponameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
    this.usernameValidationState = '';
    this.helpBlock = '';
  }

  onInvalidUsername() {
    this.usernameValidationState = 'has-error';
    this.helpBlock = 'Please enter a subscription url.';
  }

  onUpdateReponame(event) {
    this.reponame = event.target.value;
    this.reponameValidationState = '';
    this.helpBlock = '';
  }

  onInvalidReponame() {
    this.reponameValidationState = 'has-error';
    this.helpBlock = 'Please enter a subscription url.';
  }
}

export default alt.createStore(SubscriptionManagerStore);