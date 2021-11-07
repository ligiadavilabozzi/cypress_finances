/// <reference types="cypress" />

import { format } from '../support/utils'

context('DevFinance', () => {
//executar antes de cada teste 
beforeEach(()=>{
    cy.visit('https://devfinance-agilizei.netlify.app/#') 
    cy.get('#data-type tbody tr').should('have.length', 0 )
});

    it('Adicionar uma nova transação de entrada', () => {
        
        cy.get('#transaction a.button.new').click()
        cy.get('#description').type('freela')
        cy.get('#amount').type(12)
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length',1)
    })

    it('Adicionar uma nova transação de saída', ()=>{

        cy.get('#transaction a.button.new').click()
        cy.get('#description').type('café')
        cy.get('#amount').type(-12)
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1)
    })
    it('Remover uma transação de entrada ou saída', () =>{
        
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('freela')
        cy.get('#amount').type('12')
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length',1)

        cy.get('td.description')
        cy.contains('freela') 
        .parent()   
        .find('img[onclick*=remove]')  
        .click()

        cy.get('table tbody tr').should('have.length', 0)

    })

    it('Validar Saldos com Diversas Transações',() => {
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('freela')
        cy.get('#amount').type(120)
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        
        cy.get('#transaction a.button.new').click()
        cy.get('#description').type('café')
        cy.get('#amount').type(-12)
        cy.get('#date').type('2021-11-03')

        cy.contains('Salvar').click();

        
        let incomes = 0; 
        let expenses = 0
        cy.get('#data-table tbody tr')
            .each(($el,index,$list)=>{
                cy.get($el).find('td.income, td.expense')
                .invoke('text').then(text=>{
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    }else{
                        incomes = incomes + format(text)
                    }
                });
            })
        
        cy.get('#totalDisplay').invoke('text').then((text)=>{
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses
            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })
    })

})
