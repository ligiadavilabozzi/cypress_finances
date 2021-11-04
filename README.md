//comandos de instalação e execução:
1. npm init --yes
2. npm install -D cypress@8.5.0 
3. npx cypress open 
    - cria a estrutura de pastas na 1a vez
    - abre o cypress test runner

npm - node package manager
npx - node package executor 

-------------------------------------------

Estrutura do cypress
- Fixtures: arquivos que ajudam em questão de MOCKS 
- Plugins: arquivos que usamos para executar o código diretamente no node e não no navegador. 
- Support: serve para criar arquivos utilitários com comandos personalizados
- Integration: mais IMPORTANTE onde tem a implementação dos testes que vamos executar - na primeira vez gerou arquivos de testes. 
No cypress tem como usar ou não os arquivos de exemplos - pode apagar direto no vs code os arquivos dentro de integration. 

----------------------------------------

Aplicação a ser testada: 
https://devfinance-agilizei.netlify.app/# 

- não tem backend - tudo salvo no localstorage 

Vamos automatizar o fluxo:
- pensar na jornada do usuário: 
    -acessar a app 
    - clicar no botão nova transação
    - preencher todos campos do forms
    - clicar em salvar

Criar um arquivo de testes dentro de integrations: 
    1) Usar o comando de visitar para acessar uma página 

    Estrutura do mocha não obrigatório, mas ajuda a visualizar a doc e completar automaticamente comandos do cypress 
        /// <reference types="cypress" />

//Estruturas que vem do Mocha: 
describe('O que estamos testando', () => {

    it('Descrição da jornada do usuário',()=>{
        cy.visit('endereço da aplicação')
        
    })
})

----------------------------
1 comando acessar a aplicação: cy.visit('endereço')
2 ações de interação com a página - comandos de mapeamento de elementos
    - get: mapear elemento usando seu seletor css - no navegador clicar em inspecionar e selecionar o "+nova transação" - o elmento destacado possui caracteristicas que podem o mapear e diferenciar de todos outros elementos. 
        - clicar em ctrl+f e mapear atributos: a[atributo=valor]: a[onclick*=open] o * significa que tem o onclick e que no valor contém open 
        cy.get('a[onclick*=open]').click()
            - no teste vai abrir o modal 
             #valorDoId 
        cy.get('#description').type('texto')
        type: comando pra digitar texto no elemento
    - contains: mapear elemento usando seu texto. 
    - pegar o texto que ta dentro do elemento - exemplo o bot]ao salvar cy.contains('Salvar') - se tiver dois tipos de botão salvar colocar um atributo a mais: cy.contains('button','Salvar').click()
    -------------------------------
    Adicionar uma asserção no teste: 
     - Adicionar uma transação e fazer uma asserção de tamanho de listagem 
        - mapear a estrutura das adições 
            - table: cabeçalho corpo e linha (thead, tbody, tr(trows))
                -trows(se tiver mais de uma inserçã terá mais de um tr)
    - usar o comando cy.get('table tbody tr').should('have.length',1)
    e dizer que deveria 'should' ter algo ('have.length',1)
    table tbody tr retorna as linhas 
    --------------------------------------

Modo headless
    Executar por baixo dos panos sem ninguém ver o que ta acontecendo
        npx cypress run 
            - no run diferente do open que abre a interface, ele sai executando o teste por baixo do pano, mas nao exibe a janela do navegador mas aparece tudo no terminal. 
            - gera um vídeo da execução - gera uma pasta de vídeo e gravou um vídeo do teste. 
---------------------------------------


