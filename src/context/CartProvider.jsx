import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (prevCart, action) => {
  if (action.type === 'ADD') {
    const updatedTotalPrice = prevCart.totalPrice + action.item.price * action.item.amount;
    //  check if already exist
    const existingCartItemIndex = prevCart.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = prevCart.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevCart.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...prevCart.items, action.item];
    }

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = prevCart.items.findIndex((item) => item.id === action.id);
    const existingCartItem = prevCart.items[existingCartItemIndex];

    const updatedTotalPrice = prevCart.totalPrice - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = prevCart.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...prevCart.items];
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
    }

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  if (action.type === 'RESET') {
    return defaultCartState;
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

  const resetCartHandler = () => {
    dispatchCart({ type: 'RESET' });
  };
  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart: resetCartHandler,
  };
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
