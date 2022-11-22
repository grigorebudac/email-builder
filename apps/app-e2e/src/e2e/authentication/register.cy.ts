describe('Register', () => {
  before('does load the page', () => {
    cy.visit('/register');
    cy.location('pathname').should('eq', '/register');
  });

  it('does not allow registering in with empty email and password', () => {
    cy.get('[data-invalid]').should('have.length', 0);

    cy.get('[data-cy=register-submit]').click();

    cy.get('[data-invalid]').should('have.length', 3);
    cy.location('pathname').should('eq', '/register');
  });

  it('does not allow invalid credentials', () => {
    cy.typeRegister('notemail', 'hello', 'hello2');
    cy.get('[data-cy=register-submit]').click();
    cy.get('[data-invalid]').should('have.length', 3);
  });
});
