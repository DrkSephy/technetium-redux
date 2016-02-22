import alt from '../alt';
import SubscriptionsActions from '../actions/SubscriptionsActions';

class SubscriptionsStore {
  constructor() {
    this.bindActions(SubscriptionsActions);
    this.username = '';
    this.reponame = '';
    this.helpBlock = '';
    this.usernameValidationState = '';
    this.reponameValidationState = '';
  }

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

export default alt.createStore(SubscriptionsStore);