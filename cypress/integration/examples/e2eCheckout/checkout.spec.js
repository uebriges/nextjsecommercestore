import { e2eAddToCartTest } from '../e2eShoppingCart/addToCart.spec';

context('shoppingCart', () => {
  e2eAddToCartTest();
});

describe('Checkout process including Thank you page: ', () => {
  it('Go to checkout and fill out delivery information', () => {
    cy.visit('/shoppingCart');
    cy.get('[cy-data="goToCheckoutButton"]').click();
    cy.get('[data-cy="checkoutDeliveryFirstName"]').type('John');
    cy.get('[data-cy="checkoutDeliveryLastName"]').type('Doe');
    cy.get('[data-cy="checkoutDeliveryStreetAddress"]').type('Example');
    cy.get('[data-cy="checkoutDeliveryStreetAddress2"]').type('street 1');
    cy.get('[data-cy="checkoutDeliveryCity"]').type('New York');
    cy.get('[data-cy="checkoutDeliveryState"]').type('New York');
    cy.get('[data-cy="checkoutDeliveryZIP"]').type('10023');
    cy.get('[data-cy="checkoutDeliveryCountry"]').type('USA');
  });

  it('Fill out different billing information', () => {
    cy.get('[cy-data="billingAdrEquDeliveryNo"]').click();
    cy.get('[data-cy="checkoutBillingFirstName"]').type('Johnny');
    cy.get('[data-cy="checkoutBillingLastName"]').type('Does');
    cy.get('[data-cy="checkoutBillingStreetAddress"]').type('Example street');
    cy.get('[data-cy="checkoutBillingStreetAddress1"]').type('431');
    cy.get('[data-cy="checkoutBillingCity"]').type('New York');
    cy.get('[data-cy="checkoutBillingState"]').type('New York');
    cy.get('[data-cy="checkoutBillingZIP"]').type('10023');
    cy.get('[data-cy="checkoutBillingCountry"]').type('USA');
  });

  it('Chose delivery option premium and finish buying process', () => {
    cy.get('[cy-data="premiumDeliveryRadioBtn"]').click();
    cy.get('[cy-data="buyNowBtn"]').click();
  });
});
