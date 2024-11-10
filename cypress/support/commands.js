describe('Car Creation and Expense Test', () => {
    let carId;

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });

        cy.contains('button', 'Guest log in').should('be.visible').click();

        cy.intercept('POST', '/api/cars').as('createCar');

        cy.get('button.btn.btn-primary').not('[disabled]').click();
        cy.get('input.form-control').type('100');

        cy.xpath('/html/body/ngb-modal-window/div/div/app-add-car-modal/div[3]/button[2]').click();

        cy.wait('@createCar').then((interception) => {
            carId = interception.response.body.id;
        });
    });

    it('should create a car and add an expense using API', () => {
        const expenseData = {
            amount: 500,
            date: '2024-11-10',
        };

        cy.createExpense(carId, expenseData);
    });
});