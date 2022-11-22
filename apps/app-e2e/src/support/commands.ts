// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    typeLogin(email: string, password: string): void;
    typeRegister(
      email: string,
      password: string,
      confirmPassword: string
    ): void;
  }
}

/**
 * Login
 */
Cypress.Commands.add('typeLogin', (email, password) => {
  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
});

/**
 * Register
 */
Cypress.Commands.add('typeRegister', (email, password, confirmPassword) => {
  cy.get('[data-cy=register-email]').type(email);
  cy.get('[data-cy=register-password]').type(password);
  cy.get('[data-cy=register-confirmPassword]').type(confirmPassword);
});
