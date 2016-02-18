import React from 'react';
import {Panel} from 'react-bootstrap';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <Panel header={this.props.header} bsStyle='primary'>
        <h3>{this.props.value}</h3>
      </Panel>
    );
  }
}

export default Card;