import React from 'react';
import IssueCommentsStore from '../stores/IssueCommentsStore';
import IssueCommentsActions from '../actions/IssueCommentsActions';

class IssueComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = IssueCommentsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    IssueCommentsStore.listen(this.onChange);
    IssueCommentsActions.getIssueComments();
  }

  componentWillUnmount() {
    IssueCommentsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let issueComments = this.state.issueComments.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.comments}</td>
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
              <td colSpan='1'>Issue Comments</td>
            </tr>
            </thead>
            <tbody>
              {issueComments}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default IssueComments;