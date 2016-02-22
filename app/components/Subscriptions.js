import React from 'react';
import SubscriptionsStore from '../stores/SubscriptionsStore';
import SubscriptionsActions from '../actions/SubscriptionsActions';
import NavbarActions from '../actions/NavbarActions';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = SubscriptionsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SubscriptionsStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SubscriptionsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.username.trim();
    let reponame = this.state.reponame.trim();

    if (!username) {
      SubscriptionsActions.invalidUsername();
      this.refs.usernameTextField.getDOMNode().focus();
    }

    if (!reponame) {
      SubscriptionsActions.invalidReponame();
      this.refs.reponameTextField.getDOMNode().focus();
    }

    if (username && reponame) {
      SubscriptionsActions.addSubscription(username, reponame);
      NavbarActions.getSubscriptions();
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
                           onChange={SubscriptionsActions.updateUsername} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.reponameValidationState}>
                    <label className='control-label'>Repository Name</label>
                    <input type='text' className='form-control' ref='reponameTextField' value={this.state.reponame}
                           onChange={SubscriptionsActions.updateReponame} autoFocus/>
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