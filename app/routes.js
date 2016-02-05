import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Commits from './components/Commits';
import Issues from './components/Issues';
import IssuesOpened from './components/IssuesOpened';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/commits' component={Commits} />
    <Route path='/issues' component={Issues} />
    <Route path='/IssuesOpened' component={IssuesOpened} />
  </Route>
);