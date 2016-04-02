import React from 'react';
import {browserHistory} from 'react-router';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loggedIn != nextState.loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const navStyle = {
      paddingRight: '20px'
    }

    return (
      this.state.loggedIn === null ?
      <div> </div> :
      this.state.loggedIn === false ?
      <div id='navbar' className='navbar-collapse collapse'>
        <ul className='nav navbar-nav navbar-right' style={navStyle}>
          <li><a href='/login/bitbucket'>Login</a></li>
        </ul>
      </div> :
      <div></div>
    );
  }
}

export default Login;