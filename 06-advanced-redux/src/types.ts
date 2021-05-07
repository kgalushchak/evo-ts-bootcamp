export type Pizza = {
    name: string;
    price: number;
    _id: string;
}

export type CartItem = Pizza & { count: number;};

export type State = {
    pizza: Pizza[];
    cart: CartItem[];
}
