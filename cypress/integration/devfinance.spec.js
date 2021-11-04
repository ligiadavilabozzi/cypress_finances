/// <reference types="cypress" />



describe('DevFinance', () => {

    it('Adicionar uma nova transação de entrada', () => {
        cy.visit('https://devfinance-agilizei.netlify.app/#')
        
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('freela')
        cy.get('#amount').type('12')
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        cy.get('table tbody tr').should('have.length',1)
    })

    it('Remover uma transação de entrada ou saída', () =>{
        cy.wait(500)

        cy.get('img[onclick*=remove]').click()
        cy.get('table tbody tr').should('have.length', 0)
    })

})

/*
*/