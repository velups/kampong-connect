describe('Kampong Connect', () => {
  it('loads the homepage', () => {
    cy.visit('/');
    cy.contains('Kampong Connect');
    cy.contains('Building Community Bonds');
  });

  it('navigates to login page', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.contains('Welcome Back');
  });

  it('navigates to register page', () => {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
    cy.contains('Join Kampong Connect');
  });

  it('can switch languages', () => {
    cy.visit('/');
    cy.contains('中文').click();
    cy.contains('建设社区联系');
    cy.contains('EN').click();
    cy.contains('Building Community Bonds');
  });

  it('protects dashboard route', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
});