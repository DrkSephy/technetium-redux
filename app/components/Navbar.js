import React from 'react';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import Login from '../components/Login';
import LoginStore from '../stores/LoginStore';
import NavbarStore from '../stores/NavbarStore';
import LoginActions from '../actions/LoginActions';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    LoginActions.getUserProfile();
    NavbarActions.getSubscriptions();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const navStyle = {
      paddingRight: '20px'
    }

    let subscriptions = this.state.subscriptions.map((data) => {
      let url = '/report/' + data.username + '/' + data.reponame
      return (
        <li key={data._id}><Link to={url}>{data.username}/{data.reponame}</Link></li>
      )
    });

    return (
      LoginStore.getState().loggedIn == true ?
        <nav className='navbar navbar-default navbar-static-top'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/subscriptions'>Subscribe</Link></li>
              <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Reports<span className='caret'></span></a>
                <ul className='dropdown-menu'>
                  {subscriptions}
                </ul>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right' style={navStyle}>
              <li><a href='#' onClick={NavbarActions.removeSubscriptions}>Unsubscribe From All</a></li>
              <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'><span><Glyphicon glyph='user' /></span> Hello, {LoginStore.getState().username}<b className='caret'></b></a>
                <ul className='dropdown-menu'>
                  <li><a href='/logout'>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        :

        <nav className='navbar navbar-default navbar-static-top'>
          <Login />
        </nav>
    );
  }
}

export default Navbar;