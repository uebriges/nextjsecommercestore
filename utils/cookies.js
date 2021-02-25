import Cookies from 'js-cookie';

export function setCookiesClientSide(key, value) {
  return Cookies.set(key, value);
}

export function getAllCookiesClientSide() {
  return Cookies.get();
}

export function getCookiesClientSide(key) {
  return Cookies.get(key);
}

export function getShoppingCartProductIds() {
  const shoppingCart = Cookies.get('shoppingCart');
  console.log('shoppingCart: ', shoppingCart);
  // const idArray = shoppingCart.map((productInShoppingCart) => {
  //   return productInShoppingCart.product_id;
  // });
  // return idArray;
}

export function updateCartTotalQuantity() {
  if (Cookies.get('shoppingCart')) {
    const totalQuantity = JSON.parse(Cookies.get('shoppingCart')).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      },
      0,
    );
    if (totalQuantity === 0) {
      return '';
    }
    return totalQuantity > 99 ? '99+' : totalQuantity;
  } else {
    return '';
  }
}

module.exports = {
  setCookiesClientSide,
  getCookiesClientSide,
  updateCartTotalQuantity,
  getShoppingCartProductIds,
  getAllCookiesClientSide,
};
