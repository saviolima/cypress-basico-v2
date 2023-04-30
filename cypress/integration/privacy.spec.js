

Cypress._.times(3, function() {
    it('testa a página da politica de privacidade de forma independentes',function() {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })

})