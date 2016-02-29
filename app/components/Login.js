import React from 'react';
import {Link} from 'react-router';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    LoginActions.getToken();
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-3'>
            <div className='panel panel-default'>
              <div className='panel-heading text-center'>Login</div>
              <div className='panel-body text-center'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <a href='/login/bitbucket'>
                    Login with Bitbucket
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;