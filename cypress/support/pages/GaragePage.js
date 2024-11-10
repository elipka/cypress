describe('Car Creation, Expense Creation, and UI Validation Test', () => {
    let carId;

    before(() => {
        // Логін як гість
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });

        cy.contains('button', 'Guest log in').should('be.visible').click();
    });

    beforeEach(() => {
        // Перехоплення запиту на створення машини
        cy.intercept('POST', '/api/cars').as('createCar');

        // Клік на кнопку для додавання машини
        cy.get('button.btn.btn-primary').not('[disabled]').click();
        cy.get('input.form-control').type('100'); // Введення пробігу машини

        // Клік на кнопку "Add"
        cy.xpath('/html/body/ngb-modal-window/div/div/app-add-car-modal/div[3]/button[2]').click();

        // Чекаємо на перехоплення запиту та отримуємо id машини
        cy.wait('@createCar').then((interception) => {
            carId = interception.response.body.id;
        });
    });

    it('should create a car and validate it through API', () => {
        // Перевірка створеної машини через API
        cy.request('GET', 'https://qauto.forstudy.space/api/cars').then((response) => {
            expect(response.status).to.eq(200);
            const car = response.body.find((car) => car.id === carId);
            expect(car).to.exist;
            expect(car).to.have.property('id', carId);
            expect(car).to.have.property('mileage', 100); // Перевірка пробігу
        });
    });

    it('should create an expense for the car and validate it through API', () => {
        const expenseData = {
            amount: 500,
            date: '2024-11-10',
        };

        // Створення витрат через API
        cy.createExpense(carId, expenseData);
    });

    it('should find the car in UI and validate the expense for it', () => {
        // Перехід на сторінку для пошуку машини
        cy.get('input[placeholder="Search"]').type(carId); // Введення id машини в пошук
        cy.get('button').contains('Search').click();

        // Перевірка, що машина знайдена в UI
        cy.contains(carId).should('exist');

        // Перевірка витрат для цієї машини
        cy.get('.expense-list').should('contain', '500'); // Перевірка суми витрат
        cy.get('.expense-list').should('contain', '2024-11-10'); // Перевірка дати витрат
    });
});