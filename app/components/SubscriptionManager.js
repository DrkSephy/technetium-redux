import React from 'react';
import LinkWithTooltip from './LinkWithTooltip';
import {ListGroup, ListGroupItem, Button, Panel, Tooltip} from 'react-bootstrap';
import SubscriptionManagerStore from '../stores/SubscriptionManagerStore';
import SubscriptionManagerActions from '../actions/SubscriptionManagerActions';
import NavbarActions from '../actions/NavbarActions';
import SubscriptionsActions from '../actions/SubscriptionsActions';

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
      SubscriptionsActions.addSubscription(username, reponame);
      // Refresh the navbar
      setTimeout(() => {
        NavbarActions.getSubscriptions();
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
        <div className='row'>
          <div className="panel panel-primary">
            <div className="panel-heading clearfix">
              <h4 className="pull-left">Subscription Manager</h4>
              <h4 className="pull-right">
                <LinkWithTooltip 
                  tooltip='Overall Repository Statistics' href='#'>
                    <span className="glyphicon glyphicon-question-sign"></span>
                </LinkWithTooltip>
              </h4>
            </div>
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
    );
  }
}

export default SubscriptionManager;