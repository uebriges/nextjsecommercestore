import React, { useContext, useReducer } from 'react';
import cookies from '../utils/cookies';

export const ACTIONS = {
  DELETE_FROM_CART: 'delete-from-cart',
  GET_CART: 'get-cart',
  UPDATE_CART: 'update-cart',
  EMPTY_CART: 'empty-cart',
};

export const ShoppingCartContext = React.createContext();

function reducer(shoppingCart, action) {
  console.log('in reducer');
  switch (action.type) {
    case ACTIONS.DELETE_FROM_CART:
      console.log('in DELETE');
      let tempShoppingCart = [];
      cookies.updateCartTotalQuantity();
      tempShoppingCart = action.payload.shoppingCart.filter((element) => {
        return !(element.productId === Number(action.payload.deletedItemId));
      });
      console.log('temp Shopping cart after deletion: ', tempShoppingCart);
      cookies.setCookiesClientSide(
        'shoppingCart',
        JSON.stringify(tempShoppingCart),
      );
      console.log(
        'after setting cookies: ',
        JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
      );
      return [...tempShoppingCart];

    case ACTIONS.GET_CART:
      console.log('in GET_CART');
      shoppingCart.length = 0;
      if (action.payload.shoppingCart) {
        for (let i = 0; i < action.payload.shoppingCart.length; i++) {
          shoppingCart.push({
            ...action.payload.shoppingCart[i],
            ...action.payload.additionalInfo.find(
              (itmInner) =>
                itmInner.productId === action.payload.shoppingCart[i].productId,
            ),
          });
        }
      }
      console.log('Enriched shopping cart: ', shoppingCart);
      return shoppingCart;

    case ACTIONS.UPDATE_CART:
      let productsInCookiesArray;
      // Shopping cart cookie exists already
      if (action.payload.shoppingCart) {
        productsInCookiesArray = action.payload.shoppingCart;
        // Find the specific product with the productId in the shopping cart.
        const product = productsInCookiesArray.find(
          (element) => element.productId === action.payload.productId,
        );
        // If that product is already in the shopping cart...
        if (product) {
          product.quantity = action.payload.newQuantity;
          productsInCookiesArray.map((element) =>
            element.productId === product.productId ? product : element,
          );
          // if product is not yet in the shopping cart...
        } else {
          productsInCookiesArray.push({
            productId: action.payload.productId,
            quantity: action.payload.newQuantity,
          });
        }
        // Shopping cart cookies doesn't exist yet...
      } else {
        productsInCookiesArray = {
          productId: action.payload.productId,
          quantity: action.payload.newQuantity,
        };
      }
      cookies.setCookiesClientSide('shoppingCart', productsInCookiesArray);
      cookies.updateCartTotalQuantity();
      return shoppingCart;

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
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
