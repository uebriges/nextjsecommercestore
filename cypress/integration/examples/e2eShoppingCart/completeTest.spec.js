import { e2eAddToCartTest } from './addToCart.spec';
import { e2eChangeQuantity } from './changeQuantity.spec';
import { e2eRemoveFromCart } from './removeFromCart.spec';

describe('Complete shopping cart test', () => {
  context('Add to cart, change quantity, remove from cart', () => {
    e2eAddToCartTest();
    e2eChangeQuantity();
    e2eRemoveFromCart();
  });
});
