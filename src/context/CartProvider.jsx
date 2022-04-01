import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (prevCart, action) => {
  if (action.type === 'ADD') {
    // later check if already exist
    const updatedItems = [...prevCart.items, action.item];
    const updatedTotalPrice = prevCart.totalPrice + action.item.price * action.item.amount;

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  if (action.type === 'REMOVE') {
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: 'ADD', item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: 'REMOVE', id });
  };
  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
