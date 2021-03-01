export function e2eChangeQuantity() {
  describe('Change quantity of product in the shopping cart', () => {
    it('Change quantity of product in the shopping cart', () => {
      cy.visit('http://localhost:3000/shoppingCart');
      cy.get('[data-cy="increaseQuantityInShoppingCart"]').click();
      cy.get('[data-cy="quantityInShoppingCart"]').should('have.value', 2);
      cy.get('[data-cy="decreaseQuantityInShoppingCart"]').click();
      cy.get('[data-cy="quantityInShoppingCart"]').should('have.value', 1);
      Cypress.Cookies.preserveOnce('shoppingCart');
    });
  });
}
