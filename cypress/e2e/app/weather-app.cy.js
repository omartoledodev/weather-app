describe('Weather app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Load the view and display the data', () => {
    cy.contains('Humidity')
    cy.contains('Last updated')
  })

  it('Go to manage locations view', () => {
    cy.get('.btn-menu').click()
    cy.contains('Manage Locations')
    cy.get('.item-manage-locations').click()
    cy.location('pathname').should('include', 'manage-locations')
  })

  it('Go to add locations view', () => {
    cy.visit('http://localhost:3000/manage-locations')
    cy.get('.btn-add').click()
    cy.location('pathname').should('include', 'add-location')
    cy.contains('Add location')
  })

  it('Type location to search', () => {
    cy.visit('http://localhost:3000/add-location')
    cy.get('#autocomplete-input').type('Spain ')
    cy.contains('Spain')
    cy.get('#autocomplete-input').clear()
    cy.get('#autocomplete-input').type('Ottawa')
    cy.contains('Canada')
  })

  it('Add location', () => {
    cy.visit('http://localhost:3000/add-location')
    cy.get('#autocomplete-input').type('Tultepec')
    cy.contains('Mexico')
    cy.get('.v-list-item__content')
      .first()
      .click()
    cy.location('pathname').should('include', '/')
    cy.contains('Tultepec')
  })
})
