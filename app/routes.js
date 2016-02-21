import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Commits from './components/Commits';
import Issues from './components/Issues';
import IssuesOpened from './components/IssuesOpened';
import IssuesAssigned from './components/IssuesAssigned';
import IssuesCompleted from './components/IssuesCompleted';
import IssueComments from './components/IssueComments';
import Chart from './components/Chart';
import TimeSeries from './components/TimeSeries';
import Reports from './components/Reports';
import PullRequest from './components/PullRequest';
import Subscriptions from './components/Subscriptions';


export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/commits' component={Commits} />
    <Route path='/issues' component={Issues} />
    <Route path='/issuesOpened' component={IssuesOpened} />
    <Route path='/issuesAssigned' component={IssuesAssigned} />
    <Route path='/issuesCompleted' component={IssuesCompleted} />
    <Route path='/issueComments' component={IssueComments} />
    <Route path='/chart' component={Chart} />
    <Route path='/timeseries' component={TimeSeries} />
    <Route path='/reports' component={Reports} />
        <Route path='/report/:user/:repo' component={Reports} />
    <Route path='/pullRequests' component={PullRequest} />
    <Route path='/subscriptions' component={Subscriptions} />
  </Route>
);