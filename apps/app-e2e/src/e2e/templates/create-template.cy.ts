describe('Create Template', () => {
  before('does load the page', () => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('does create template when valid credentials are entered', () => {
    cy.intercept('POST', '/api/templates').as('createTemplateRequest');

    cy.get('[data-cy=createTemplate]').click();
    cy.typeCreateTemplate('test', 'test');
    cy.get('[data-cy=createTemplate-submit]').click();

    cy.wait('@createTemplateRequest')
      .its('response.statusCode')
      .should('eq', 201);
  });
});
