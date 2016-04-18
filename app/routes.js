import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Reports from './components/Reports';
import PullRequest from './components/PullRequest';
import Login from './components/Login';
import SubscriptionManager from './components/SubscriptionManager';

export default (
  <Route component={App}>
    <Route path='/' />
    <Route path='/login' component={Login} />
    <Route path='/reports' component={Reports} />
        <Route path='/report/:username/:reponame' component={Reports} />
    <Route path='/subscriptionManager' component={SubscriptionManager} />
  </Route>
);