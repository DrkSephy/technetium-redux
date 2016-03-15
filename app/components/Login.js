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

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const divStyle = {
      paddingLeft: '40%',
      paddingTop: '10%'
    }

    const linkStyle = {
      textDecoration: 'none'
    }

    return (
      <div className='container' style={divStyle}>
        <div className='row flipInX animated'>
          <div className='col-sm-3'>
            <div className='panel panel-primary'>
              <div className='panel-heading text-center'>Login</div>
              <div className='panel-body text-center'>
                <button type='submit' className='btn btn-success'>
                  <a style={linkStyle} href='/login/bitbucket'>Login</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;