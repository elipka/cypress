class GaragePage {
    login(username, password) {
        cy.visit(Cypress.config('baseUrl'), {
            auth: {
                username: username,
                password: password,
            },
        });
    }

    loginAsGuest() {
        cy.contains('button', 'Guest log in').click();
    }

    visit() {
        cy.visit(`${Cypress.config('baseUrl')}${Cypress.env('loginedUrl')}`);
    }

    checkUrl() {
        cy.url().should('eq', `${Cypress.config('baseUrl')}${Cypress.env('loginedUrl')}`);
    }

    addCar(mileage) {
        cy.contains('button', 'Add car').click();
        cy.get('.car-make').should('contain', 'Audi');
        cy.get('.car-model').should('contain', 'TT');
        cy.get('.car-mileage').type(mileage);
        cy.contains('button', 'Add').click();
    }

    addFuelExpense() {
        cy.contains('button', 'Add fuel expense').click();
        cy.get('.fuel-mileage').clear().type(200);
        cy.get('.fuel-liters').type(200);
        cy.get('.fuel-cost').type(200);
        cy.contains('button', 'Add').click();
    }
}

export default new GaragePage();
