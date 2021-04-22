import React, {Component, CSSProperties} from 'react';
import '../styles.css';

interface ArrayItemProps {
  height: number
}

export class ArrayItem extends Component<ArrayItemProps> {
  render() {
    const itemStyle: CSSProperties = {
      height: this.props.height,
    };

    return <div className="array-item" style={itemStyle}/>;
  }
}
