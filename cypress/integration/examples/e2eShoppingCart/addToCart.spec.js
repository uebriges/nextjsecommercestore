export function e2eAddToCartTest() {
  describe('Add to cart', function () {
    it('Add one additional quantity to the shopping cart', () => {
      cy.visit('/singleProduct/1');
      const startingCartQuantityValue = Number(
        cy
          .get('[data-cy="TotalQuantityInShoppingCart"]')
          .invoke('text')
          .then(parseFloat),
      );
      const startingQuantity = isNaN(startingCartQuantityValue)
        ? 0
        : Number(startingCartQuantityValue);
      cy.get('[data-cy="IncreaseQuantityButton"]').click();
      cy.get('[data-cy="AddToCartButton"]').click();
      cy.get('[data-cy="TotalQuantityInShoppingCart"]')
        .invoke('text')
        .then(parseFloat)
        .should((newQuantity) => {
          expect(newQuantity).not.to.eq(startingQuantity);
        });
      Cypress.Cookies.preserveOnce('shoppingCart');
    });
  });
}
