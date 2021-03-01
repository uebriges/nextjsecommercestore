import { e2eAddToCartTest } from './addToCart.spec';
import { e2eChangeQuantity } from './changeQuantity.spec.';
import { e2eRemoveFromCart } from './removeFromCart';

context('shoppingCart', () => {
  e2eAddToCartTest();
  e2eChangeQuantity();
  e2eRemoveFromCart();
});
