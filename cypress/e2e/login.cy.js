describe('SignUp Test', () => {
    it('Should login successfully with valid credentials', () => {
        // Visitar la página de login
        cy.visit('http://localhost:5173/login');

        // Llenar el formulario con credenciales válidas
        cy.get('input[name="login"]').type('juanitobanana');
        cy.get('#pass').type('123_abcD');

        // Enviar el formulario
        cy.get('.signIn__form').submit();

        // Verificar que se ha redirigido a la página principal (o alguna página protegida)
        cy.url().should('include', '/');

    });
});