import React from 'react';
import {Link} from 'react-router';
import TimeSeriesStore from '../stores/TimeSeriesStore';
import TimeSeriesActions from '../actions/TimeSeriesActions';

class TimeSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = TimeSeriesStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    TimeSeriesStore.listen(this.onChange);
    TimeSeriesActions.getData(this.props.username, this.props.reponame);
  }

  componentWillUnmount() {
    TimeSeriesStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='chart_2'></div>
    );
  } 
} 

export default TimeSeries;