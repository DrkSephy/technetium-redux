import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import TimeSeries from './components/TimeSeries';
import Reports from './components/Reports';
import PullRequest from './components/PullRequest';
import Subscriptions from './components/Subscriptions';
import Login from './components/Login';


export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/reports' component={Reports} />
        <Route path='/report/:username/:reponame' component={Reports} />
    <Route path='/subscriptions' component={Subscriptions} />
  </Route>
);