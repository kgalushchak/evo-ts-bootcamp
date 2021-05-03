import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AnyAction, createStore, compose} from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const transaction = (state = 0, action: AnyAction) => {
  switch (action.type) {
  case 'UPDATE_BALANCE':
    return action.payload;
  case 'SET_BALANCE_WITH_TAX':
    return state - state * action.payload / 100;
  case 'CREDIT':
    return state - action.payload;
  case 'DEBIT':
    return state + action.payload;
  default:
    return state;
  }
};

const store = createStore(transaction, undefined, composeEnhancers());

const array = [
  { type: 'UPDATE_BALANCE', payload: 1000.0 },
  { type: 'CREDIT', payload: 200.0 },
  { type: 'CREDIT', payload: 100.0 },
  { type: 'SET_BALANCE_WITH_TAX', payload: 14.0 },
  { type: 'DEBIT', payload: 250.0 },
  { type: 'UPDATE_BALANCE', payload: 1000.0 },
];

array.forEach(action => store.dispatch(action));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
