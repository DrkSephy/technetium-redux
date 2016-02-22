import React from 'react';
import LinkWithTooltip from './LinkWithTooltip';

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
      <div className="panel panel-primary">
        <div className="panel-heading clearfix">
          <h4 className="pull-left">{this.props.header}</h4>
          <h4 className="pull-right">
            <LinkWithTooltip tooltip={this.props.tooltip} href='#'>(?)</LinkWithTooltip>
          </h4>
        </div>
        <h2 className="text-center">
          {this.props.value}
        </h2>
      </div>
    );
  }
}

export default Card;