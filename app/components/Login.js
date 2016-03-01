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
    const divStyle = {
      paddingLeft: '40%',
      paddingRight: '40%',
      paddingTop: '10%'
    }

    const linkStyle = {
      textDecoration: 'none'
    }

    return (
      <div style={divStyle}>
        <div className='container'>
          <div className='row flipInX animated'>
            <div className='col-sm-3'>
              <div className='panel panel-primary'>
                <div className='panel-heading text-center'>Login</div>
                <div className='panel-body text-center'>
                  <button type='submit' className='btn btn-success'>
                    <a style={linkStyle} href='/login/bitbucket'>Login with Bitbucket</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;