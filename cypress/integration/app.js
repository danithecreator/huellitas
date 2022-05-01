/* global cy */

describe('The app render whitout problems', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Should the home page render whitout problems', function () {
    cy.contains('Huellitas 2022')
    cy.contains('Buscar')
    cy.contains('Inicio')
    cy.contains('Registro')
    cy.contains('Inicia Sesion')
    cy.contains('Inicia Sesion')
  })
  it('Should the login form can be open', function () {
    cy.contains('Inicia Sesion').click()
    cy.contains('Ingrese su email')
  })
  it(
    'Should the login form can be submited and the user redirected to the homepage',
    { defaultCommandTimeout: 10000 },
    function () {
      cy.contains('Inicia Sesion').click()
      cy.get('[name="email"]').type('danigiraldo410@gmail.com')
      cy.get('[name="password"]').type('12345678')
      cy.get('#signInButton').click()
      cy.url().should('eq', 'http://localhost:3000/')
    }
  )
  it(
    'Should render the search page and detail page whitout problems',
    { defaultCommandTimeout: 10000 },
    function () {
      cy.contains('Buscar').click()
      cy.contains('Natural Toys')
      cy.contains('$13000')
      cy.get('#76z2KHXUTMa8OH65snog').click()
      cy.contains(
        'Son blandas para su fácil digestión; con una alta palatividad, preparados y horneados muy cuidadosamente. Tu mascota tiene que el verdadero sabor natural.'
      )
      cy.url().should(
        'eq',
        'http://localhost:3000/product/76z2KHXUTMa8OH65snog'
      )
    }
  )
})
