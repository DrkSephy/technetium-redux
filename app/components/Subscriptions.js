import React from 'react';
import SubscriptionManagerStore from '../stores/SubscriptionManagerStore';
import SubscriptionManagerActions from '../actions/SubscriptionManagerActions';
import NavbarActions from '../actions/NavbarActions';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = SubscriptionManagerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SubscriptionManagerStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SubscriptionManagerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.username.trim();
    let reponame = this.state.reponame.trim();

    if (!username) {
      SubscriptionManagerActions.invalidUsername();
      this.refs.usernameTextField.getDOMNode().focus();
    }

    if (!reponame) {
      SubscriptionManagerActions.invalidReponame();
      this.refs.reponameTextField.getDOMNode().focus();
    }

    if (username && reponame) {
      // Add new subscription to database
      SubscriptionManagerActions.addSubscription(username, reponame);
      // Get all subscriptions
      setTimeout(() => {
        NavbarActions.getSubscriptions();
      }, 3000);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Subscription</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.usernameValidationState}>
                    <label className='control-label'>Username</label>
                    <input type='text' className='form-control' ref='usernameTextField' value={this.state.username}
                           onChange={SubscriptionManagerActions.updateUsername} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.reponameValidationState}>
                    <label className='control-label'>Repository Name</label>
                    <input type='text' className='form-control' ref='reponameTextField' value={this.state.reponame}
                           onChange={SubscriptionManagerActions.updateReponame} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscriptions;