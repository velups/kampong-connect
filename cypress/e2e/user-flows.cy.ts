describe('Kampong Connect User Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Elder Registration Flow', () => {
    it('completes elder registration successfully', () => {
      // Navigate to register page
      cy.contains('Get Started').click();
      cy.url().should('include', '/register');

      // Select Elder role
      cy.contains('I need help').click();
      
      // Fill registration form
      cy.get('input[name="name"]').type('John Elder');
      cy.get('input[name="email"]').type('elder@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      cy.get('input[name="terms"]').check();
      
      // Submit form
      cy.contains('Create Account').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back!');
    });

    it('shows validation errors for invalid input', () => {
      cy.contains('Get Started').click();
      cy.contains('I need help').click();
      
      // Try to submit with mismatched passwords
      cy.get('input[name="name"]').type('John Elder');
      cy.get('input[name="email"]').type('elder@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('differentpassword');
      cy.get('input[name="terms"]').check();
      
      cy.contains('Create Account').click();
      cy.contains('Passwords do not match');
    });
  });

  describe('Volunteer Registration Flow', () => {
    it('completes volunteer registration successfully', () => {
      cy.contains('Get Started').click();
      cy.contains('I want to help').click();
      
      cy.get('input[name="name"]').type('Jane Volunteer');
      cy.get('input[name="email"]').type('volunteer@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      cy.get('input[name="terms"]').check();
      
      cy.contains('Create Account').click();
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Authentication Flow', () => {
    it('allows existing users to login', () => {
      cy.contains('Login').click();
      cy.url().should('include', '/login');
      
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password');
      cy.contains('Sign In').click();
      
      cy.url().should('include', '/dashboard');
    });

    it('shows error for invalid credentials', () => {
      cy.contains('Login').click();
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.contains('Sign In').click();
      
      cy.contains('Invalid email or password');
    });
  });

  describe('Dashboard Navigation', () => {
    beforeEach(() => {
      // Login first
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password');
      cy.contains('Sign In').click();
    });

    it('navigates to all main sections', () => {
      // Test navigation to each section
      cy.contains('Requests').click();
      cy.url().should('include', '/requests');
      cy.contains('Assistance Requests');

      cy.contains('Messages').click();
      cy.url().should('include', '/messages');
      cy.contains('Messages');

      cy.contains('Profile').click();
      cy.url().should('include', '/profile');
      cy.contains('Profile');

      cy.contains('Dashboard').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard');
    });

    it('allows user logout', () => {
      // Click on user menu
      cy.get('[data-testid="user-menu"]').should('be.visible').click();
      cy.contains('Logout').click();
      
      // Should redirect to home page
      cy.url().should('not.include', '/dashboard');
      cy.contains('Building Community Bonds');
    });
  });

  describe('Accessibility Features', () => {
    it('supports keyboard navigation', () => {
      // Test tab navigation through main elements
      cy.get('body').tab();
      cy.focused().should('contain', 'Skip to main content');
      
      cy.get('body').tab();
      cy.focused().should('contain', 'Kampong Connect');
    });

    it('has proper ARIA labels', () => {
      cy.get('[aria-label]').should('exist');
      cy.get('main').should('have.attr', 'id', 'main-content');
    });
  });

  describe('Language Toggle', () => {
    it('switches between English and Chinese', () => {
      cy.contains('Building Community Bonds');
      
      cy.contains('中文').click();
      cy.contains('建设社区联系');
      
      cy.contains('EN').click();  
      cy.contains('Building Community Bonds');
    });

    it('persists language selection', () => {
      cy.contains('中文').click();
      cy.reload();
      cy.contains('建设社区联系');
    });
  });
});