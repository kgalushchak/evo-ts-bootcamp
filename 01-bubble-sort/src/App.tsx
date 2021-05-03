import React, {Component, CSSProperties} from 'react';
import {getRandomNumbersArray} from './utils/randomNumberArrayGenerator';
import {Array} from './components/Array';
import {Status} from './types';
import {sort} from './utils/sorter';
import {ControlButton} from './components/ControlButton';
import './styles.css';

interface AppState {
  array: number[],
  status: Status,
}

export class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      array: getRandomNumbersArray(),
      status: Status.notStarted
    };
  }

  private interval = 0;

  newArrayBtnHandler = () => {
    clearInterval(this.interval);
    this.setState({
      status: Status.notStarted,
      array: getRandomNumbersArray()
    });
  }

  startSortingBtnHandler = () => {
    if (this.state.status === Status.notStarted) {
      this.setState({status: Status.sorting});
      let arrayBeforeChange = [...this.state.array];
      this.interval = window.setInterval(() => {
        this.setState({array: sort(this.state.array)});
        const isArraySorted = JSON.stringify(this.state.array) === JSON.stringify(arrayBeforeChange);
        if (isArraySorted) {
          this.setState({status: Status.sorted});
          clearInterval(this.interval);
        } else {
          arrayBeforeChange = [...this.state.array];
        }
      }, 100);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Bubble sort</h1>
        <Array array={this.state.array}/>
        <div>Status: {this.state.status}</div>
        <div>
          <ControlButton handler={this.newArrayBtnHandler} text="New array"/>
          <ControlButton handler={this.startSortingBtnHandler} text="Start sorting"/>
        </div>
      </div>
    );
  }
}
