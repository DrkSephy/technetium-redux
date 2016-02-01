import React from 'react';
import IssuesStore from '../stores/IssuesStore';
import IssuesActions from '../actions/IssuesActions';

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = IssuesStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    IssuesStore.listen(this.onChange);
    IssuesActions.getIssues();
  }

  componentWillUnmount() {
    IssuesStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let issues = this.state.issues.map((data) => {
      return (
        <tbody>
          <tr>
            <td>{data.reported_by}</td>
            <td>{data.title}</td>
            <td>{data.responsible}</td>
            <td>{data.priority}</td>
            <td>{data.metadata}</td>
          </tr> 
        </tbody>
      );
    });

    return (
      <div className='container'>
        <div className='panel panel-default'>
          <table className='table table-striped'>
            <thead>
            <tr>
              <td colSpan='1'>Reported By</td>
              <td colSpan='1'>Title</td>
              <td colSpan='1'>Resonsible</td>
              <td colSpan='1'>Priority</td>
              <td colSpan='1'>Type</td>
            </tr>
            </thead>
              {issues}
          </table>
        </div>
      </div>
    );
  }
}

export default Issues;