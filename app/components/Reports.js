import React from 'react';
import {Link} from 'react-router';
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
    ReportsActions.getCommits();
    ReportsActions.getIssuesOpened();
    ReportsActions.getIssuesAssigned();
    ReportsActions.getIssuesCompleted();
    ReportsActions.getIssuesComments();
    ReportsActions.getReportData();
    ReportsActions.getPullRequests();
    ReportsActions.getLinesOfCode();
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
          <td>{data.linesAdded}</td>
          <td>{data.linesRemoved}</td>
        </tr>
      );
    });
    
    return (
      <div className='container'>
        <div className='panel panel-default'>
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
              <th colSpan='1'>Lines Added</th>
              <th colSpan='1'>Lines Removed</th>
            </tr>
            </thead>
            <tbody>
              {reportData}
            </tbody>
          </table>
        </div>
      </div>
    );    
  }
}

export default Reports;