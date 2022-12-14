describe('Login', () => {
  before('does load the page', () => {
    cy.visit('/login');
    cy.location('pathname').should('eq', '/login');
  });

  it('does not allow logging in with empty email and password', () => {
    cy.get('[data-invalid]').should('have.length', 0);

    cy.get('[data-cy=login-submit]').click();

    cy.get('[data-invalid]').should('have.length', 2);
    cy.location('pathname').should('eq', '/login');
  });

  it('does not allow invalid credentials', () => {
    cy.typeLogin('notemail', 'hello');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-invalid]').should('have.length', 2);
  });

  it('does login with the correct credentials', () => {
    cy.login();
    cy.location('pathname').should('eq', '/');
  });
});
