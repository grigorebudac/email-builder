describe('Edit Template', () => {
  before('does load the page', () => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('does redirect the user to the template page', () => {
    cy.get('[data-cy^="editTemplate-"]').first().click();
    cy.url().should('include', '/editor/');
  });
});
