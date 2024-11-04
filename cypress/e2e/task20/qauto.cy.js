import GaragePage from '../support/pages/GaragePage';

describe('Registration, Login, and Garage Tests', () => {
    const environments = [
        { configFile: 'cypress/config/qauto1.config.js', envName: 'QAuto 1' },
        { configFile: 'cypress/config/qauto2.config.js', envName: 'QAuto 2' },
    ];

    environments.forEach(({ configFile, envName }) => {
        const config = require(configFile);

        describe(`${envName} Tests`, () => {
            beforeEach(() => {
                cy.visit(config.baseUrl, {
                    auth: {
                        username: 'guest',
                        password: 'welcome2qauto',
                    },
                });
            });

            it('should register a new user', () => {
                const email = `testuser${Math.floor(Math.random() * 1000)}@example.com`;
                const password = config.user.password;
                Cypress.env('email', email);
                cy.registerUserQAuto1(email, password);
            });

            it('should login with the registered user', () => {
                const password = config.user.password;
                const email = Cypress.env('email');
                cy.login(email, password);
            });

            it('should navigate to the garage and add a new car', () => {
                GaragePage.visit();
                GaragePage.checkUrl();
                GaragePage.addCar(100);

                cy.get('.car-list').should('contain', 'Audi TT').and('contain', '100');
            });

            it('should add fuel expenses to the added car', () => {
                GaragePage.visit();
                GaragePage.checkUrl();

                GaragePage.addFuelExpense();

                cy.url().should('eq', `${config.baseUrl}/panel/expenses?carId=1`);

                cy.contains('200.00 USD').should('be.visible');
            });
        });
    });
});
