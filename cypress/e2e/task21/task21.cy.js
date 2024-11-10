describe('Car Creation with Interception Test', () => {
    beforeEach(() => {
        // Відвідуємо сайт і виконуємо логін
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto', // Креденшели для входу
            },
        });

        // Після авторизації натискаємо кнопку "Guest log in"
        cy.contains('button', 'Guest log in').should('be.visible').click();
    });

    it('should create a car through UI and validate it via API', () => {
        // Додаємо перехоплення для POST запиту створення машини
        cy.intercept('POST', '/api/cars').as('createCar');
        
        // Додаємо перехоплення для GET запиту на список машин
        cy.intercept('GET', '/api/cars').as('getCars');
        
        // Додаємо машину через UI
        cy.get('button.btn.btn-primary').not('[disabled]').click(); // Клік на кнопку додавання машини
        cy.get('input.form-control').type('100'); // Введення пробігу машини

        // Клік на кнопку "Add" за допомогою XPath
        cy.xpath('/html/body/ngb-modal-window/div/div/app-add-car-modal/div[3]/button[2]').click();

        // Дочекаємося завершення запиту створення машини
        cy.wait('@createCar').then((interception) => {
            // Логуємо перехоплений запит
            console.log(interception);
            expect(interception.response.statusCode).to.eq(201); // Перевірка статусу запиту
            const carId = interception.response.body.id; // Отримуємо ID машини з відповіді
            console.log(`Created Car ID: ${carId}`);

            // Тепер чекаємо на запит на отримання всіх машин і перевіряємо, що створена машина є в списку
            cy.wait('@getCars').then(() => {
                cy.request('/api/cars') // Запит на список машин
                    .its('body') // Отримуємо body з відповіді
                    .should('include.deep.members', [{ id: carId }]); // Перевіряємо, що створена машина є в списку
            });
        });
    });
});
