import React from 'react';
import IssuesOpenedStore from '../stores/IssuesOpenedStore';
import IssuesOpenedActions from '../actions/IssuesOpenedActions';

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = IssuesOpenedStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    IssuesOpenedStore.listen(this.onChange);
    IssuesOpenedActions.getIssuesOpened();
  }

  componentWillUnmount() {
    IssuesOpenedStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let issuesOpened = this.state.issuesOpened.map((data) => {
      return (
        <tr key={data.id}>
          <td>{data.username}</td>
          <td>{data.opened}</td>
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
              <td colSpan='1'>Opened</td>
            </tr>
            </thead>
            <tbody>
              {issuesOpened}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Issues;