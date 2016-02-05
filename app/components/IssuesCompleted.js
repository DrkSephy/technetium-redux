import React from 'react';
import IssuesCompletedStore from '../stores/IssuesCompletedStore';
import IssuesCompletedActions from '../actions/IssuesCompletedActions';

class IssuesCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = IssuesCompletedStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    IssuesCompletedStore.listen(this.onChange);
    IssuesCompletedActions.getIssuesCompleted();
  }

  componentWillUnmount() {
    IssuesCompletedStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let issuesCompleted = this.state.issuesCompleted.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.completed}</td>
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
              <td colSpan='1'>Issues Completed</td>
            </tr>
            </thead>
            <tbody>
              {issuesCompleted}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default IssuesCompleted;