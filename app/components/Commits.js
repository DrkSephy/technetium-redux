import React from 'react';
import {Link} from 'react-router';
import CommitsStore from '../stores/CommitsStore';
import CommitsActions from '../actions/CommitsActions';

class Commits extends React.Component {
  constructor(props) {
    super(props);
    this.state = CommitsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CommitsStore.listen(this.onChange);
    CommitsActions.getCommits();
  }

  componentWillUnmount() {
    CommitsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    let commits = this.state.commits.map((data) => {
      return (
        <tr>
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

export default Commits;