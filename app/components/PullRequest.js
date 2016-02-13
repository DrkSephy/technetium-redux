import React from 'react';
import {Link} from 'react-router';
import PullRequestStore from '../stores/PullRequestStore';
import PullRequestActions from '../actions/PullRequestActions';

class PullRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = PullRequestStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PullRequestStore.listen(this.onChange);
    PullRequestActions.getPullRequests();
  }

  componentWillUnmount() {
    PullRequestStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let pullRequests = this.state.pullRequests.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.pullRequests}</td>
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
              <th colSpan='1'>Pull Requests</th>
            </tr>
            </thead>
            <tbody>
              {pullRequests}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PullRequest;