import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class LinkWithTooltip extends React.Component {
  render() {
    let tooltip = <Tooltip id={this.props.tooltip}>{this.props.tooltip}</Tooltip>;

    return (
      <OverlayTrigger
        overlay={tooltip} placement="left"
        delayShow={200} delayHide={150}>
        <a href={this.props.href}>{this.props.children}</a>
      </OverlayTrigger>
    );
  }
}

export default LinkWithTooltip;