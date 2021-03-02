// eslint-disable-next-line
const { deleteItemFromCart, ACTIONS } = require('../cartContextHelper');
const cookies = require('../cookies');

test('Updating amount in item of cookie + cart sum function ', () => {
  const testProductSet = [
    {
      id: 1,
      quantity: 3,
    },
    { id: 2, quantity: 8 },
  ];
  cookies.setCookiesClientSide('shoppingCart', JSON.stringify(testProductSet));
  expect(cookies.updateCartTotalQuantity()).toBe(11);
  const shoppingCartCookie = JSON.parse(
    cookies.getCookiesClientSide('shoppingCart'),
  );
  shoppingCartCookie[0].quantity = 9;
  cookies.setCookiesClientSide('shoppingCart', shoppingCartCookie);
  expect(cookies.updateCartTotalQuantity()).toBe(17);
});

test('Add and remove entries in cookies', () => {
  const testProductSet = [
    {
      productId: 1,
      quantity: 3,
    },
    { productId: 2, quantity: 8 },
  ];
  cookies.setCookiesClientSide('shoppingCart', testProductSet);
  expect(cookies.updateCartTotalQuantity()).toBe(11);
  const shoppingCartCookie = JSON.parse(
    cookies.getCookiesClientSide('shoppingCart'),
  );
  const action = {
    payload: {
      shoppingCart: shoppingCartCookie,
      deletedItemId: 2,
      currentState: [
        {
          productId: 2,
          productName: 'Product 2',
          pricePerUnit: 30.2,
        },
        {
          productId: 1,
          productName: 'Product 1',
          pricePerUnit: 10.8,
        },
      ],
    },
  };

  const newCart = deleteItemFromCart(ACTIONS.DELETE_FROM_CART, action);
  expect(newCart.length).toBe(1);
});
