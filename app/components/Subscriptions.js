import React from 'react';
import SubscriptionsStore from '../stores/SubscriptionsStore';
import SubscriptionsActions from '../actions/SubscriptionsActions';

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
    let url = this.state.url.trim();

    if (!url) {
      SubscriptionsActions.invalidUrl();
      this.refs.urlTextField.getDOMNode().focus();
    }

    if (url) {
      SubscriptionsActions.addSubscription(url);
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
                  <div className={'form-group ' + this.state.urlValidationState}>
                    <label className='control-label'>Subscription URL</label>
                    <input type='text' className='form-control' ref='urlTextField' value={this.state.url}
                           onChange={SubscriptionsActions.updateUrl} autoFocus/>
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