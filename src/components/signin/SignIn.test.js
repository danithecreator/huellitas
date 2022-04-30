import SignIn from './SignIn'
import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'

import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'

describe('Testin the Sing In form', () => {
  it('Should render the Sign In form whitout errors', () => {
    const component = render(
      <BrowserRouter>
        <SignIn></SignIn>
      </BrowserRouter>
    )
    component.getByText(/inicia sesion/i)
    component.getByText(/ingresa/i)
    component.getByText('¿Has olvidado la contraseña?')
    component.getByText(/continuar con google/i)
    const sideImg = component.getByRole('sideImg')
    expect(sideImg).toHaveAttribute('alt', 'imagen del formulario')
  })

  it('Should redirect to the "/" when the form submit has all inputs  validate and the user its register in the DB', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <SignIn></SignIn>
      </Router>
    )

    const userEmail = component.getByRole('email')
    fireEvent.change(userEmail, {
      target: { value: 'danigiraldo410@gmail.com' }
    })

    const userPassword = component.getByRole('password')
    fireEvent.change(userPassword, { target: { value: '12345678' } })

    const button = component.getByText(/ingresar/i)

    expect(userEmail.value).toBe('danigiraldo410@gmail.com')
    expect(userPassword.value).toBe('12345678')
    fireEvent.submit(button)
    expect(history.location.pathname).toBe('/')
  })

  it('Should redirect to the "/" when the user sign in whit Google', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <SignIn></SignIn>
      </Router>
    )
    const googleButton = component.getByText(/continuar con google/i)
    fireEvent.submit(googleButton)

    expect(history.location.pathname).toBe('/')
  })
})
