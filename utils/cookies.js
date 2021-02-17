import Cookies from 'js-cookie';

export function setCookiesClientSide(key, value) {
  return Cookies.set(key, value);
}

export function getCookiesClientSide(key) {
  return Cookies.get(key);
}

module.exports = {
  setCookiesClientSide,
  getCookiesClientSide,
};
