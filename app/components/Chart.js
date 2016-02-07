import React from 'react';
import {Link} from 'react-router';
import ChartStore from '../stores/ChartStore';
import ChartActions from '../actions/ChartActions';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = ChartStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ChartStore.listen(this.onChange);
    ChartActions.getData();
  }

  componentWillUnmount() {
    ChartStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='chart_1'></div>
    );
  } 
}

export default Chart;