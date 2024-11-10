describe('Header & Footer Buttons Test', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });

  it('should find the Home button', () => {
    cy.contains('Home').should('be.visible');
  });

  it('should find the About button', () => {
    cy.contains('About').should('be.visible');
  });

  it('should find the Contacts button', () => {
    cy.contains('Contacts').should('be.visible');
  });

  it('should find the Guest log in button', () => {
    cy.contains('Guest log in').should('be.visible');
  });

  it('should find the Sign In button', () => {
    cy.contains('Sign In').should('be.visible');
  });

  it('should find the Facebook button', () => {
    cy.get('a[href*="facebook.com"]').should('be.visible');
  });

  it('should find the Telegram button', () => {
    cy.get('a[href*="t.me"]').should('be.visible');
  });

  it('should find the YouTube button', () => {
    cy.get('a[href*="youtube.com"]').should('be.visible');
  });

  it('should find the Instagram button', () => {
    cy.get('a[href*="instagram.com"]').should('be.visible');
  });

  it('should find the LinkedIn button', () => {
    cy.get('a[href*="linkedin.com"]').should('be.visible');
  });

  it('should find the School Site button', () => {
    cy.get('a[href*="ithillel.ua"]').should('be.visible');
  });

  it('should find the Email button', () => {
    const email = 'support@ithillel.ua'; 
    cy.contains(email).should('be.visible');
  });
});
