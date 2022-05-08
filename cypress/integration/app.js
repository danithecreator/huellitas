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
      cy.contains('ZeeDog Super Orange - Naranja')
      cy.contains('$35000')
      cy.get('#eshI7Ch2Q5isFjAI1yWE').click()
      cy.contains(
        'A tu perro le encantará nuestro juguete para perros Super Orange. ¡Durables, resistentes y muy divertidos, diseñamos todos nuestros juguetes para perros Super Fruit con un fondo dispensador de golosinas para recordarle que los rellene con golosinas saludables! ¡Sí, saludable!'
      )
      cy.url().should(
        'eq',
        'http://localhost:3000/product/eshI7Ch2Q5isFjAI1yWE'
      )
    }
  )
})
