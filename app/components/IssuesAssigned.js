import React from 'react';
import IssuesAssignedStore from '../stores/IssuesAssignedStore';
import IssuesAssignedActions from '../actions/IssuesAssignedActions';

class IssuesAssigned extends React.Component {
  constructor(props) {
    super(props);
    this.state = IssuesAssignedStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    IssuesAssignedStore.listen(this.onChange);
    IssuesAssignedActions.getIssuesAssigned();
  }

  componentWillUnmount() {
    IssuesAssignedStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let issuesAssigned = this.state.issuesAssigned.map((data) => {
      console.log(data);
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.responsible}</td>
        </tr>
      );
    });

    return (
      <div className='container'>
        <div className='panel panel-default'>
          <table className='table table-striped'>
            <thead>
            <tr>
              <td colSpan='1'>Username</td>
              <td colSpan='1'>Issues Assigned</td>
            </tr>
            </thead>
            <tbody>
              {issuesAssigned}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default IssuesAssigned;