import Cookies from 'js-cookie';

export function setCookiesClientSide(key, value) {
  return Cookies.set(key, value);
}

export function getCookiesClientSide(key) {
  return Cookies.get(key);
}

export function updateCartTotalQuantity() {
  if (Cookies.get('shoppingCart')) {
    const totalQuantity = JSON.parse(Cookies.get('shoppingCart')).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      },
      0,
    );
    return totalQuantity > 99 ? '99+' : totalQuantity;
  } else {
    return '';
  }
}

module.exports = {
  setCookiesClientSide,
  getCookiesClientSide,
  updateCartTotalQuantity,
};
