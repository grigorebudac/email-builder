describe('Delete Template', () => {
  before('does load the page', () => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('does create template when valid credentials are entered', () => {
    cy.intercept('DELETE', `/api/templates/*`).as('deleteTemplateRequest');

    cy.get('[data-cy^="deleteTemplate-"]').first().click();

    cy.get('[data-cy^="deleteTemplate-btn"]').first().click();

    cy.wait('@deleteTemplateRequest')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
