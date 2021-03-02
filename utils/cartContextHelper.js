import cookies from './cookies';

// eslint-disable-next-line
export const ACTIONS = {
  DELETE_FROM_CART: 'delete-from-cart',
  UPDATE_CART: 'get-cart',
  ADD_ADDITIONAL_INFO_TO_CART: 'update-cart',
  EMPTY_CART: 'empty-cart',
};

// Helper function for useReducer
// Deletes an item from the cart
export function deleteItemFromCart(state, action) {
  cookies.updateCartTotalQuantity();
  const tempShoppingCart = action.payload.shoppingCart.filter((element) => {
    return !(element.productId === Number(action.payload.deletedItemId));
  });
  cookies.setCookiesClientSide(
    'shoppingCart',
    JSON.stringify(tempShoppingCart),
  );
  const newState = tempShoppingCart.map((cookieProduct) =>
    action.payload.currentState.find((realProduct) => {
      return realProduct.productId === cookieProduct.productId;
    }),
  );
  return newState;
}

// Helper function for useReducer
// Adds additional info to the cart stored in the cookies (e.g. product name)

export function addAdditionalInfoToCart(state, action) {
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
  return updatedCart;
}

// Helper function for useReducer
// Update shopping cart if products or quantities are changed

export function updateShoppingCart(state, action) {
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
  console.log('productsInCookiesArray: ', productsInCookiesArray);
  cookies.setCookiesClientSide('shoppingCart', productsInCookiesArray);
  cookies.updateCartTotalQuantity();
  return state;
}
