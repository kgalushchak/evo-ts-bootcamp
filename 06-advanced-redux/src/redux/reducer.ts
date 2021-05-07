import { AnyAction } from 'redux';
import {Pizza, State} from '../types';
import {ActionType} from './actions';
import {getPizza} from '../services/api';

const initialState: State = {
  pizza: [],
  cart: []
};

getPizza()
  .then(pizza => { initialState.pizza = pizza.items; });

export const reducer = (state: State = initialState, action: AnyAction): State => {
  const { type, pizzaId } = action;
  const clickedPizza = state.pizza.filter(x => x._id === pizzaId)[0];
  const isClickedPizzaInCart = state.cart.filter(x => x._id === pizzaId).length > 0;
  const clickedPizzaInCart = state.cart.filter(x => x._id === pizzaId)[0];
  let newState: State;

  switch (type) {
  case ActionType.PIZZA_VIEWED:
    logEvent(ActionType.PIZZA_VIEWED, clickedPizza);
    return state;
  case ActionType.PIZZA_SELECTED:
    return state;
  case ActionType.PIZZA_ADDED_INTO_BASKET:
    if (!isClickedPizzaInCart) {
      newState = {
        ...state,
        cart: [...state.cart, {...clickedPizza, count: 1}]
      };
      logEvent(ActionType.PIZZA_ADDED_INTO_BASKET, clickedPizza);
      return newState;
    } else {
      newState = {
        ...state,
        cart: [...state.cart.filter(x => x._id !== clickedPizza._id), {...clickedPizza, count: clickedPizzaInCart.count + 1}]
      };
      logEvent(ActionType.PIZZA_ADDED_INTO_BASKET, clickedPizza);
      return newState;
    }
  case ActionType.PIZZA_REMOVED_FROM_BASKET:
    if (clickedPizzaInCart.count > 1) {
      const index = state.cart.findIndex(e => e._id === clickedPizzaInCart._id);
      newState = {
        ...state,
        cart: [...state.cart.filter(x => x._id !== clickedPizza._id)]
      };
      newState.cart.splice(index, 0, {...clickedPizza, count: clickedPizzaInCart.count - 1});
      logEvent(ActionType.PIZZA_REMOVED_FROM_BASKET, clickedPizza);
      return newState;
    } else {
      newState = {
        ...state,
        cart: [...state.cart.filter(x => x._id !== clickedPizza._id)]
      };
      logEvent(ActionType.PIZZA_REMOVED_FROM_BASKET, clickedPizza);
      return newState;
    }
  default:
    return state;
  }
};

interface Event {
  eventName: ActionType,
  pizzaName: string,
  pizzaPrice: number
}

const logEvent = (eventName: ActionType, pizza: Pizza) => {
  const event: Event = {
    eventName: eventName,
    pizzaName: pizza.name,
    pizzaPrice: pizza.price
  };
  const log = JSON.stringify(event);
  console.log(log);
  sendLogToServer(log);
};

const sendLogToServer = (data: string) => fetch('http://localhost:3001/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: data
}).then((json) => {
  console.log(json);
}).catch((ex) => {
  console.log(ex);
});
