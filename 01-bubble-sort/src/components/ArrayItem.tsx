import React, {Component, CSSProperties} from 'react';

interface ArrayItemProps {
  height: number
}

export class ArrayItem extends Component<ArrayItemProps> {
  render() {
    const itemStyle: CSSProperties = {
      backgroundColor: 'yellow',
      border: '1px solid red',
      borderRadius: '5px',
      stroke: 'red',
      width:'10px',
      height: this.props.height,
      display: 'inline-block'
    };

    return <div style={itemStyle}/>;
  }
}
