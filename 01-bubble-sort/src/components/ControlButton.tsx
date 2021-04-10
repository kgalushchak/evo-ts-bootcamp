import React, {Component, CSSProperties} from 'react';

interface ControlButtonProps {
  text: string,
  handler: () => void
}

export class ControlButton extends Component<ControlButtonProps>{
  render() {
    const buttonStyle: CSSProperties = {
      border: '1px solid red',
      borderRadius: '4px',
      backgroundColor: 'white',
      margin: '10px',
      fontSize: '20px',
      fontFamily: 'courier',
    };

    return (
      <button style={buttonStyle} onClick={this.props.handler}>{this.props.text}</button>
    );
  }
}
