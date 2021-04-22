import React, {Component, CSSProperties} from 'react';
import {ArrayItem} from './ArrayItem';
import '../styles.css';

interface ArrayProps {
  array: number[]
}

export class Array extends Component<ArrayProps> {
  render() {
    const items = this.props.array.map((item, index) => {
      return <ArrayItem key={index} height={item}/>;
    });

    return (
      <div className="array">
        {items}
      </div>
    );
  }
}
