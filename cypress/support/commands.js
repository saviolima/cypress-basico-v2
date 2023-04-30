Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Savio')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('savio@gmail.com')
    cy.get('#open-text-area').type('text area')
    cy.get('button[type="submit"]').click()
})