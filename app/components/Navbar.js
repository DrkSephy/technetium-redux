import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getSubscriptions();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let subscriptions = this.state.subscriptions.map((data) => {
      let url = '/report/' + data.username + '/' + data.reponame
      return (
        <li><Link to={url}>{data.username}/{data.reponame}</Link></li>
      )
    });

    return (
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
            {/*}
            <li><Link to='/commits'>Commits</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Issue Data<span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/issues'>Issues</Link></li>
                <li><Link to='/issuesOpened'>Issues Opened</Link></li>
                <li><Link to='/issuesAssigned'>Issues Assigned</Link></li>
                <li><Link to='/issuesCompleted'>Issues Completed</Link></li>
                <li><Link to='/issueComments'>Issue comments</Link></li>
              </ul>
            </li>
            <li><Link to='/pullRequests'>Pull Requests</Link></li>
            <li><Link to='/reports'>Reports</Link></li>
            */}
            <li><Link to='/subscriptions'>Subscribe</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Subscriptions<span className='caret'></span></a>
              <ul className='dropdown-menu'>
                {subscriptions}
              </ul>
            </li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;