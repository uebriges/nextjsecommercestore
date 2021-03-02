import React, { useReducer } from 'react';
import {
  ACTIONS,
  addAdditionalInfoToCart,
  deleteItemFromCart,
  updateShoppingCart,
} from './cartContextHelper';
import cookies from './cookies';

export const shoppingCartContext = React.createContext();

function reducer(shoppingCart, action) {
  switch (action.type) {
    case ACTIONS.DELETE_FROM_CART:
      return deleteItemFromCart(shoppingCart, action);

    case ACTIONS.ADD_ADDITIONAL_INFO_TO_CART:
      return addAdditionalInfoToCart(shoppingCart, action);

    case ACTIONS.UPDATE_CART:
      return updateShoppingCart(shoppingCart, action);

    case ACTIONS.EMPTY_CART:
      cookies.setCookiesClientSide('shoppingCart', JSON.stringify([]));
      return [];

    default:
      return shoppingCart;
  }
}

export function ShoppingCartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <shoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </shoppingCartContext.Provider>
  );
}
