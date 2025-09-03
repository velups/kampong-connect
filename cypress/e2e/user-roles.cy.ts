describe('User Role Differentiation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('creates Elder user and shows Elder dashboard', () => {
    // Register as Elder
    cy.contains('Get Started').click();
    cy.contains('I need help').click();
    
    cy.get('input[name="name"]').type('John Elder User');
    cy.get('input[name="email"]').type('elder.test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[name="terms"]').check();
    
    cy.contains('Create Account').click();
    
    // Should be on dashboard
    cy.url().should('include', '/dashboard');
    
    // Should show Elder-specific content
    cy.contains('Welcome back, John Elder User!');
    cy.contains('your activity overview');
    cy.contains('My Requests');
    cy.contains('New Request'); // Elder-specific button
    cy.contains('My Recent Requests');
  });

  it('creates Volunteer user and shows Volunteer dashboard', () => {
    // Register as Volunteer
    cy.contains('Get Started').click();
    cy.contains('I want to help').click();
    
    cy.get('input[name="name"]').type('Jane Volunteer User');
    cy.get('input[name="email"]').type('volunteer.test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[name="terms"]').check();
    
    cy.contains('Create Account').click();
    
    // Should be on dashboard  
    cy.url().should('include', '/dashboard');
    
    // Should show Volunteer-specific content
    cy.contains('Welcome back, Jane Volunteer User!');
    cy.contains('what\'s happening in your community');
    cy.contains('Available Requests');
    cy.contains('People Helped');
    cy.contains('Recent Community Requests');
    
    // Should NOT show Elder-specific button
    cy.contains('New Request').should('not.exist');
  });

  it('differentiates between Elder and Volunteer login', () => {
    // First create an Elder
    cy.visit('/register');
    cy.contains('I need help').click();
    cy.get('input[name="name"]').type('Elder Login Test');
    cy.get('input[name="email"]').type('elder.login@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[name="terms"]').check();
    cy.contains('Create Account').click();
    
    // Logout
    cy.get('[data-testid="user-menu"]').click();
    cy.contains('Logout').click();
    
    // Login again
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('elder.login@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Sign In').click();
    
    // Should still show Elder dashboard
    cy.contains('Elder Login Test');
    cy.contains('New Request');
  });
});