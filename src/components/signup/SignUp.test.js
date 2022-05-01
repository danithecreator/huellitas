import SingUp from './SingUp'
import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'

import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

describe('Testin the Sing Up form', () => {
  it('Should render the Sign Up form whitout errors', () => {
    const component = render(
      <BrowserRouter>
        <SingUp></SingUp>
      </BrowserRouter>
    )
    component.getByText(/ingrese su nombre completo/i)
    component.getByText(/ingrese su email/i)
    component.getByText('Ingrese su contraseña')
    component.getByText('Confirme su contraseña')
    const registrate = component.getAllByText(/registrate/i)
    expect(registrate).toHaveLength(2)
  })

  it('Should redirecto to "/"', () => {
    const history = createMemoryHistory()

    const component = render(
      <Router history={history}>
        <SingUp></SingUp>
      </Router>
    )

    const button = component.getByRole('submit')
    fireEvent.click(button)
    expect(history.location.pathname).toBe('/')
  })
})
