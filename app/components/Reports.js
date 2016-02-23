import React from 'react';
import ReactTooltip from 'react-tooltip';
import {Panel, Tooltip} from 'react-bootstrap';
import LinkWithTooltip from './LinkWithTooltip';
import Card from './Card';
import TimeSeries from './TimeSeries';
import ReportsStore from '../stores/ReportsStore';
import ReportsActions from '../actions/ReportsActions';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = ReportsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ReportsStore.listen(this.onChange);
    ReportsActions.getReportData(this.props.params.username, this.props.params.reponame);
    ReportsActions.getOpenedIssues(this.props.params.username, this.props.params.reponame);
    ReportsActions.getFilteredCommits(this.props.params.username, this.props.params.reponame);
    ReportsActions.getSparklineData(this.props.params.username, this.props.params.reponame);
    ReportsActions.getSparklineIssuesOpenedData(this.props.params.username, this.props.params.reponame);
    ReportsActions.getSparklineIssuesAssignedData(this.props.params.username, this.props.params.reponame);
    ReportsActions.getSparklineIssuesClosedData(this.props.params.username, this.props.params.reponame);
  }

  componentWillUnmount() {
    ReportsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    let reportData = this.state.reportData.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.commits}</td>
          <td>{data.pullRequests}</td>
          <td>{data.issuesAssigned}</td>
          <td>{data.issuesClosed}</td>
          <td>{data.issuesOpened}</td>
          <td>{data.issuesComments}</td>
        </tr>
      );
    });

    return (
      <div className='container'>

        <div className='row'>
          <div className="col-md-3">
            <Card header='Commits' 
              value={this.state.commits.commits} 
              tooltip='Commits over the last 7 days.' 
              sparklineData={this.state.sparklineData} />
          </div>
          <div className="col-md-3">
            <Card header='Issues Opened' 
              value={this.state.issuesOpened.opened} 
              tooltip='Issues Opened over the last 7 days.' 
              sparklineData={this.state.sparklineIssuesOpened} /></div>
          <div className="col-md-3">
            <Card header='Issues Assigned' 
              value={this.state.issuesOpened.assigned} 
              tooltip='Issues Assigned over the last 7 days.' 
              sparklineData={this.state.sparklineIssuesAssigned} /></div>
          <div className="col-md-3">
            <Card header='Issues Closed' 
              value={this.state.issuesOpened.resolved} 
              tooltip='Issues Closed over the last 7 days.' 
              sparklineData={this.state.sparklineIssuesClosed} /></div>
        </div>

          <div className="panel panel-primary">
            <div className="panel-heading clearfix">
              <h4 className="pull-left">Repository Statistics</h4>
              <h4 className="pull-right">
                <LinkWithTooltip 
                  tooltip='Overall Repository Statistics' href='#'>(?)
                </LinkWithTooltip>
              </h4>
            </div>
            <div className="table-responsive">
              <table className='table table-striped'>
                <thead>
                <tr>
                  <th colSpan='1'>Username</th>
                  <th colSpan='1'>Commits</th>
                  <th colSpan='1'>Pull Requests</th>
                  <th colSpan='1'>Issues Assigned</th>
                  <th colSpan='1'>Issues Closed</th>
                  <th colSpan='1'>Issues Opened</th>
                  <th colSpan='1'>Issue Comments</th>
                </tr>
                </thead>
                <tbody>
                  {reportData}
                </tbody>
              </table>
            </div>
          </div>

        <div className="panel panel-primary">
          <div className="panel-heading clearfix">
            <h4 className="pull-left">Weekly Commit Time Series</h4>
            <h4 className="pull-right">
              <LinkWithTooltip tooltip='Commit History over the last 7 days.' href='#'>(?)</LinkWithTooltip>
            </h4>
          </div>
          <TimeSeries 
            username={this.props.params.username} 
            reponame={this.props.params.reponame} />
        </div>
      </div>
    );  
  }
}

export default Reports;