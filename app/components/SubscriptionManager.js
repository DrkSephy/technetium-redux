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
    // SubscriptionManagerActions.getSubscriptions();
    SubscriptionManagerActions.getRepositories();
    this.refs.usernameTextField.focus();
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
      event.currentTarget.style.backgroundColor = '#27d24b';
      event.currentTarget.style.borderColor = '#ffffff'
      // Get id of subscription to remove
      const id = event.currentTarget.getAttribute('data-id');
      const username = event.currentTarget.getAttribute('data-username');
      const reponame = event.currentTarget.getAttribute('data-reponame');
      // Handle unsubscribe action
      SubscriptionManagerActions.handleUnsubscribe(id, username, reponame);
      // Refresh the navbar
      setTimeout(() => {
        NavbarActions.getSubscriptions();
        SubscriptionManagerActions.getRepositories();
        // SubscriptionManagerActions.getSubscriptions();
      }, 3000);
    }

    // // Trigger subscribe event
    else if (event.currentTarget.value == 'subscribe') {
      event.currentTarget.innerHTML = 'Unsubscribe';
      event.currentTarget.value = 'unsubscribe';
      event.currentTarget.style.backgroundColor = '#f15051';
      event.currentTarget.style.borderColor = '#ffffff'
      const username = event.currentTarget.getAttribute('data-username');
      const reponame = event.currentTarget.getAttribute('data-reponame');

      // // Call existing subscribe action to add subscription
      SubscriptionManagerActions.addSubscription(username, reponame);
      // Refresh the navbar
      setTimeout(() => {
        NavbarActions.getSubscriptions();
        SubscriptionManagerActions.getRepositories();
      }, 3000);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.username.trim();
    let reponame = this.state.reponame.trim();

    if (!username) {
      SubscriptionManagerActions.invalidUsername();
      this.refs.usernameTextField.focus();
    }

    if (!reponame) {
      SubscriptionManagerActions.invalidReponame();
      this.refs.reponameTextField.focus();
    }

    if (username && reponame) {
      // Add new subscription to database
      SubscriptionManagerActions.addSubscription(username, reponame);
      // Get all subscriptions
      setTimeout(() => {
        NavbarActions.getSubscriptions();
        SubscriptionManagerActions.getRepositories();
        // SubscriptionManagerActions.getSubscriptions();
      }, 3000);
    }
  }

  render() {
    const tdStyle = {
      verticalAlign: 'middle'
    }

    let repositories = this.state.repos.map((repository) => {
      return (
        <tr key={repository.id}>
          <td style={tdStyle}><a href={repository.link} target='_blank'>{repository.name}</a></td>
          <td style={tdStyle}>
            <Button
              data-id={repository.repoid}
              data-username={repository.username}
              data-reponame={repository.name}
              bsStyle={repository.subscribed ? 'danger' : 'success'}
              value={repository.subscribed ? 'unsubscribe' : 'subscribe'}
              onClick={this.handleClick.bind(this)}
              > {repository.subscribed ? 'Unsubscribe' : 'Subscribe'}
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
                <div className='form-group'>
                  <div className={'col-sm-6 ' + this.state.usernameValidationState}>
                    <label className='control-label'>Username</label>
                    <input type='text' className='form-control' ref='usernameTextField' value={this.state.username}
                           onChange={SubscriptionManagerActions.updateUsername} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'col-sm-6 ' + this.state.reponameValidationState}>
                    <label className='control-label'>Repository Name</label>
                    <input type='text' className='form-control' ref='reponameTextField' value={this.state.reponame}
                           onChange={SubscriptionManagerActions.updateReponame} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <button type='submit' className='btn btn-success'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='row flipInX animated'>
          <div className='panel panel-primary'>
            <div className="panel-heading clearfix">
              Repositories
              <div className='pull-right'>
                <LinkWithTooltip 
                  tooltip='Owned Repositories' href='#'>
                    <span className="glyphicon glyphicon-question-sign"></span>
                </LinkWithTooltip>
              </div>
            </div>
            <div className='panel-body'>
              <div className="table-responsive">
                <table className='table table-striped'>
                  <thead>
                  <tr>
                    <th colSpan='1'>Repository Name</th>
                    <th colSpan='1'>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {repositories}
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