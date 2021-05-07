import React from 'react';
import './App.css';
import {
  Loading,
  Missing,
  PizzaList,
  PizzaBasket,
  TotalPrice
} from './components';
import * as R from 'ramda';
import { useApp } from './hooks';
import { connect} from 'react-redux';
import {State} from './types';
import {AnyAction, Dispatch} from 'redux';
import {addPizzaToCart, removePizzaFromCart, viewPizza} from './redux/actions';


function AppUI(props: {
  state: State;
  addPizzaToCartHandler: (id: string) => void;
  removePizzaFromCartHandler: (id: string) => void;
  viewPizzaHandler: (id: string) => void;
}) {
  useApp();

  let totalPrice = 0;
  const cart = [...props.state.cart];
  cart.forEach(item => {
    totalPrice = totalPrice + item.count * item.price;
  });

  const pizzaList = R.cond([
    [R.isEmpty, Loading],
    [R.T, (xs) => PizzaList({ pizza: xs, onAdd: props.addPizzaToCartHandler, onHover: props.viewPizzaHandler })],
  ]);
  const pizzaBucket = R.cond([
    [R.isEmpty, Missing],
    [R.T, (xs) => PizzaBasket({ pizza: xs, onMinus: props.removePizzaFromCartHandler })],
  ]);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          {pizzaList(props.state.pizza)}
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPrice price={totalPrice} />
          {pizzaBucket(props.state.cart)}
          <div className="flex flex-col">
            <button
              className="bg-yellow-400 rounded-xl pt-2 pb-2"
            >Make Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: State) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    viewPizzaHandler: (pizzaId: string) => { dispatch(viewPizza(pizzaId)); },
    addPizzaToCartHandler: (pizzaId: string) => { dispatch(addPizzaToCart(pizzaId)); },
    removePizzaFromCartHandler: (pizzaId: string) => { dispatch(removePizzaFromCart(pizzaId)); }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
