import React, {Component, CSSProperties} from 'react';
import '../styles.css';

interface ControlButtonProps {
  text: string,
  handler: () => void
}

export class ControlButton extends Component<ControlButtonProps>{
  render() {
    return (
      <button className="control-btn" onClick={this.props.handler}>{this.props.text}</button>
    );
  }
}
