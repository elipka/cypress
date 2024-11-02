describe('Registration Tests', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });

        cy.get('button.header_signin').click();
        cy.contains('button', 'Registration').click();
    });

    it('should show error for empty Name field', () => {
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.get('#signupLastName').click();
        cy.contains('Name required').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Name characters', () => {
        cy.get('#signupName').type('!@#');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupLastName').click();
        cy.contains('Name is invalid').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Name min length', () => {
        cy.get('#signupName').type('A');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupLastName').click();
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Name max length', () => {
        cy.get('#signupName').type('AAAAAAAAAAAAAAAAAAAAAAA');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupLastName').click();
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should show error for empty Last Name field', () => {
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupLastName').click();
        cy.get('#signupName').click();
        cy.contains('Last name required').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Last Name characters', () => {
        cy.get('#signupLastName').type('!@#');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Last name is invalid').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Last Name min length', () => {
        cy.get('#signupLastName').type('A');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Last Name max length', () => {
        cy.get('#signupLastName').type('AAAAAAAAAAAAAAAAAAAAAAA');  
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should show error for empty Email field', () => {
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupEmail').click();
        cy.get('#signupName').click();
        cy.contains('Email required').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Email format', () => {
        cy.get('#signupEmail').type('wrongEmail');
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Email is incorrect').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should show error for empty Password field', () => {
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupPassword').click();
        cy.get('#signupName').click();
        cy.contains('Password required').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Password min length', () => {
        cy.get('#signupPassword').type('short');
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Password max length', () => {
        cy.get('#signupPassword').type('this is very long password value');
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should validate Password requirements', () => {
        cy.get('#signupPassword').type('PasswordValue');
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupName').click();
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should show error for empty Re-enter Password field', () => {
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupRepeatPassword').click();
        cy.get('#signupName').click();
        cy.contains('Re-enter password required').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should check if passwords match', () => {
        cy.get('#signupPassword').type('Password123');
        cy.get('#signupRepeatPassword').type('DifferentPassword');
        cy.get('#signupName').click();
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible').and('have.css', 'color', 'rgb(220, 53, 69)');
    });

    it('should successfully register with valid inputs', () => {
        cy.get('#signupName').type('Test');
        cy.get('#signupLastName').type('User');
        const randomNum = Math.floor(Math.random() * 10000);
        const email = `test${randomNum}@example.com`;
        cy.get('#signupEmail').type(email);
        cy.get('#signupPassword').type('ValidPass123');
        cy.get('#signupRepeatPassword').type('ValidPass123');
        cy.contains('button', 'Register').click();
        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
        Cypress.env('email', email);
    });

    it('should login successfully', () => {
        const email = Cypress.env('email');
        cy.login(email, 'ValidPass123');
        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
    });
});
