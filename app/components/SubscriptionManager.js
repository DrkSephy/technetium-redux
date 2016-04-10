import React from 'react';
import LinkWithTooltip from './LinkWithTooltip';
import {ListGroup, ListGroupItem, Button, Panel, Tooltip} from 'react-bootstrap';
import SubscriptionManagerStore from '../stores/SubscriptionManagerStore';
import SubscriptionManagerActions from '../actions/SubscriptionManagerActions';
import NavbarActions from '../actions/NavbarActions';

class SubscriptionManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = SubscriptionManagerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SubscriptionManagerStore.listen(this.onChange);
    SubscriptionManagerActions.getSubscriptions();
  }

  componentWillUnmount() {
    SubscriptionManagerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(event) {
    event.preventDefault();

    // Trigger unsubscribe event
    if (event.currentTarget.value == 'unsubscribe') {
      event.currentTarget.innerHTML = 'Subscribe';
      event.currentTarget.value = 'subscribe';
      event.currentTarget.bsStyle = 'primary';
      // Get id of subscription to remove
      const id = event.target.getAttribute('data-id');
      // Handle unsubscribe action
      SubscriptionManagerActions.handleUnsubscribe(id);
      // Refresh the navbar
      setTimeout(() => {
        NavbarActions.getSubscriptions();
        SubscriptionManagerActions.getSubscriptions();
      }, 3000);
    }

    // Trigger subscribe event
    else if (event.currentTarget.value == 'subscribe') {
      event.currentTarget.innerHTML = 'Unsubscribe';
      event.currentTarget.value = 'unsubscribe';
      event.currentTarget.bsStyle = 'danger';
      const username = event.target.getAttribute('data-username');
      const reponame = event.target.getAttribute('data-reponame');
      // Call existing subscribe action to add subscription
      SubscriptionManagerActions.addSubscription(username, reponame);
      // Refresh the navbar
      setTimeout(() => {
        NavbarActions.getSubscriptions();
        SubscriptionManagerActions.getSubscriptions();
      }, 3000);
    }
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
        SubscriptionManagerActions.getSubscriptions();
      }, 3000);
    }
  }

  render() {
    const tdStyle = {
      verticalAlign: 'middle'
    }

    let subscriptions = this.state.subscriptions.map((data) => {
      return (
        <tr key={data._id}>
          <td style={tdStyle}>{data.username}</td>
          <td style={tdStyle}>{data.reponame}</td>
          <td style={tdStyle}>
            <Button
              data-id={data._id}
              data-username={data.username}
              data-reponame={data.reponame}
              bsStyle='danger'
              value='unsubscribe'
              onClick={this.handleClick.bind(this)}>Unsubscribe
            </Button></td>
        </tr>
      );
    });

    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-primary'>
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

        <div className='row flipInX animated'>
          <div className='panel panel-primary'>
            <div className="panel-heading clearfix">
              Subscription Manager
              <div className='pull-right'>
                <LinkWithTooltip 
                  tooltip='Current Subscriptions' href='#'>
                    <span className="glyphicon glyphicon-question-sign"></span>
                </LinkWithTooltip>
              </div>
            </div>
            <div className='panel-body'>
              <div className="table-responsive">
                <table className='table table-striped'>
                  <thead>
                  <tr>
                    <th colSpan='1'>Username</th>
                    <th colSpan='1'>Repository Name</th>
                    <th colSpan='1'>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {subscriptions}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionManager;