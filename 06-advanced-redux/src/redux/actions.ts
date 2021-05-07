export enum ActionType {
  PIZZA_VIEWED = 'PIZZA_VIEWED',
  PIZZA_SELECTED = 'PIZZA_SELECTED',
  PIZZA_ADDED_INTO_BASKET = 'PIZZA_ADDED_INTO_BASKET',
  PIZZA_REMOVED_FROM_BASKET = 'PIZZA_REMOVED_FROM_BASKET'
}

export function viewPizza(pizzaId: string) {
  return {
    type: ActionType.PIZZA_VIEWED,
    pizzaId
  };
}

export function selectPizza(pizzaId: string) {
  return {
    type: ActionType.PIZZA_SELECTED,
    pizzaId
  };
}

export function addPizzaToCart(pizzaId: string) {
  return {
    type: ActionType.PIZZA_ADDED_INTO_BASKET,
    pizzaId
  };
}

export function removePizzaFromCart(pizzaId: string) {
  return {
    type: ActionType.PIZZA_REMOVED_FROM_BASKET,
    pizzaId
  };
}
