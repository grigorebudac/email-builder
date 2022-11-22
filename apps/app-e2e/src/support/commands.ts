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
    login(): void;
    typeLogin(email: string, password: string): void;
    typeRegister(
      email: string,
      password: string,
      confirmPassword: string
    ): void;

    typeCreateTemplate(title: string, description: string): void;
  }
}

/**
 * Login
 */
Cypress.Commands.add('login', () => {
  cy.intercept('/api/templates').as('getTemplates');

  cy.visit('/login');
  cy.get('[data-cy=login-email]').type(Cypress.env('CYPRESS_USER_EMAIL'));
  cy.get('[data-cy=login-password]').type(Cypress.env('CYPRESS_USER_PASSWORD'));
  cy.get('[data-cy=login-submit]').click();

  cy.wait('@getTemplates');
});

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

/**
 * Template
 */
Cypress.Commands.add('typeCreateTemplate', (title, description) => {
  cy.get('[data-cy=createTemplate-title]').type(title);
  cy.get('[data-cy=createTemplate-description]').type(description);
});
