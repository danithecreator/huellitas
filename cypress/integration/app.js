/* global cy */

describe('The app render whitout problems', function () {
  it('Should the home page render whitout problems', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Huellitas 2022')
    cy.contains('Inicia Sesion')
  })
})
