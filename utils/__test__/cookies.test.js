const cookies = require('../cookies');

test('Updating amount in item of cookie ', () => {
  const testProductSet = [
    {
      id: 1,
      quantity: 3,
    },
    { id: 2, quantity: 8 },
  ];
  console.log(cookies.setCookiesClientSide('shoppingCart', testProductSet));
  expect(cookies.updateCartTotalQuantity()).toBe(11);
  let shoppingCartCookie = JSON.parse(
    cookies.getCookiesClientSide('shoppingCart'),
  );
  shoppingCartCookie[0].quantity = 9;
  cookies.setCookiesClientSide('shoppingCart', shoppingCartCookie);
  expect(cookies.updateCartTotalQuantity()).toBe(17);
});

test('Add and remove entries in cookie ', () => {
  // Can't use hook here to remove item from the cart.
  // Test doesn't make sense
});
