export function e2eRemoveFromCart() {
  describe('Remove product from the shopping cart', () => {
    it('Remove product from the shopping cart', () => {
      cy.visit('/shoppingCart');
      cy.get('[data-cy="deleteProductFromShoppingCart"]').click();
    });
  });
}
