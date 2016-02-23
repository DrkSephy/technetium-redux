import React from 'react';
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <Sparklines data={this.props.sparklineData} width={200} height={40}>
        <SparklinesLine color="blue" />
        <SparklinesSpots style={{ fill: "red" }} />
      </Sparklines>
    );
  }
}

export default Sparkline;