import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';
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
    ReportsActions.getReportData();
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
      <div>
        <div>
          <Panel header='Repository Statistics'>
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
                  </tr>
                  </thead>
                  <tbody>
                    {reportData}
                  </tbody>
                </table>
              </div>
            </div>
          </Panel>
        </div>

        <div>
          <Panel header='Commit Time Series'>
            <div className='container'>
              <TimeSeries />
            </div>
          </Panel>
        </div>
      </div>

    );  
  }
}

export default Reports;