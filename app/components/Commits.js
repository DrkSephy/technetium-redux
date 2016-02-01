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
        <tbody>
          <tr>
            <td>DrkSephy</td>
            <td>Commits: {data['DrkSephy'].commits}</td>
          </tr>
          <tr>
            <td>Venegu</td>
            <td>Commits: {data['venegu'].commits}</td>
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
              <th colSpan='2'>Commits</th>
            </tr>
            </thead>
              {commits}
          </table>
        </div>
      </div>
    );
  }

  
}

export default Commits;