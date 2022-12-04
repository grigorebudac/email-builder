describe('Duplicate Template', () => {
  before('does load the page', () => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('does duplicate template', () => {
    cy.intercept('POST', '/api/templates').as('duplicateTemplateRequest');

    cy.get('[data-cy^="duplicateTemplate-"]').first().click();

    cy.wait('@duplicateTemplateRequest')
      .its('response.statusCode')
      .should('eq', 201);
  });
});
