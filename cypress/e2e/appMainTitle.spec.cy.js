describe('Main HTML/JS Tests', () => {


  it('ddc-app index ok (smoke test)', () => {

    //visiter page d'accueil.html
    //cy.visit("http://localhost:4200/index.html")
    //cy.visit("http://localhost:4000/index.html")
    //cy.visit("http://localhost:3000/index.html")
    cy.visit("http://localhost:3000/index.csr.html")

    

    //vérifier que la zone d'id my-header-title comporte le texte 'ddc-app' ou 'Didier DEFRANCE (site pro)'
    cy.get('#my-header-title')
      .should('have.text', 'Didier DEFRANCE (site pro)')
  })


})