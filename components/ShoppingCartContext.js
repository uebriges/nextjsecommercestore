import React, { useReducer } from 'react';
import cookies from '../utils/cookies';

export const ACTIONS = {
  DELETE_FROM_CART: 'delete-from-cart',
  GET_CART: 'get-cart',
  ADD_ADDITIONAL_INFO_TO_CART: 'update-cart',
  EMPTY_CART: 'empty-cart',
};

export const ShoppingCartContext = React.createContext();

function reducer(shoppingCart, action) {
  console.log('in reducer');
  switch (action.type) {
    case ACTIONS.DELETE_FROM_CART:
      console.log('in DELETE');
      cookies.updateCartTotalQuantity();
      const tempShoppingCart = action.payload.shoppingCart.filter((element) => {
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
      console.log('temp shopping cart: ', tempShoppingCart);
      const newState = tempShoppingCart.map((cookieProduct) =>
        action.payload.currentState.find((realProduct) => {
          return realProduct.productId === cookieProduct.productId;
        }),
      );
      console.log('tempShopingCart: ', newState);
      return newState;

    case ACTIONS.GET_CART:
      console.log('in GET_CART');
      const updatedCart = [];
      if (action.payload.shoppingCart) {
        for (let i = 0; i < action.payload.shoppingCart.length; i++) {
          updatedCart.push({
            ...action.payload.shoppingCart[i],
            ...action.payload.additionalInfo.find(
              (itmInner) =>
                itmInner.productId === action.payload.shoppingCart[i].productId,
            ),
          });
        }
      }
      console.log('Enriched shopping cart: ', updatedCart);
      return updatedCart;

    case ACTIONS.ADD_ADDITIONAL_INFO_TO_CART:
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
