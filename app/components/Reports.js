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
  }

  componentWillUnmount() {
    ReportsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let commits = this.state.commits.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.commits}</td>
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
            </tr>
            </thead>
            <tbody>
              {commits}
            </tbody>
          </table>
        </div>
      </div>
    );    
  }
}

export default Reports;