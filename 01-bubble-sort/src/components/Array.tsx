import React, {Component, CSSProperties} from 'react';
import {ArrayItem} from './ArrayItem';

interface ArrayProps {
  array: number[]
}

export class Array extends Component<ArrayProps> {
  render() {
    const arrayStyle: CSSProperties = {
      height: '500px',
      margin: '10px',
    };

    const items = this.props.array.map((item, index) => {
      return <ArrayItem key={index} height={item}/>;
    });

    return (
      <div style={arrayStyle}>
        {items}
      </div>
    );
  }
}
