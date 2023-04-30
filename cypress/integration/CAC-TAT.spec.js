/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
         cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Savio')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('savio@gmail.com')
        cy.get('#phone').type('0000000')
        cy.get('#open-text-area').type('text area')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatacao inválida', function () {
        cy.get('#firstName').type('Savio')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('savio@gmail,com')
        cy.get('#phone').type('0000000')
        cy.get('#open-text-area').type('text area')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com o valor nao numerico', function() {
        cy.get('#phone').type('afhfhahdf').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Savio')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('savio@gmail.com')
        cy.get('#phone-checkbox').check()//utilizar para checkbox`s
        cy.get('#open-text-area').type('text area')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Savio').should('have.value','Savio').clear().should('have.value','')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto(Youtube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto(Mentoria) por seu valor(value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto(Blog) por seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('Marca o tipo de antendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('Marca cada tipo de antendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json').should(function ($input){
            expect($input[0].files[0].name).to.equals('example.json')
        })
    })

    it('seleciona um arquivo silumando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'}).should(function ($input){
            expect($input[0].files[0].name).to.equals('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
    })

    it('verifica a politica de privacidade abre em outra aba sem a necessidade de clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e entáo clicando no link',function(){
        cy.get('#privacy a').invoke('removeAttr', 'target' ).click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    
    it.only('faz uma requisicao http', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
          const { status, statusText, body } = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
        })
    })
    


  })