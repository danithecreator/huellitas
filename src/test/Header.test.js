import Header from '../components/header/Header'
import { render, screen, fireEvent } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'

describe('Testing the header', () => {
  it('Should render the header whitout errors', () => {
    const component = render(
      <BrowserRouter>
        <Header></Header>
      </BrowserRouter>
    )
    component.getByText(/inicio/i)
    component.getByText(/buscar/i)
    component.getByText(/registro/i)
    component.getByText(/inicia sesion/i)
    const logo = component.getByRole('img')
    expect(logo).toHaveAttribute('src', 'logo.svg')
    expect(logo).toHaveAttribute('alt', 'logo de la tienda')
  })

  it('Should redirect to /login when clicking the "Inicia Sesion" link', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <Header></Header>
      </Router>
    )

    const button = component.getByText(/inicia sesion/i)
    fireEvent.click(button)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should redirect to /registration when clicking the "Registro" link', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <Header></Header>
      </Router>
    )

    const button = component.getByText(/registro/i)
    fireEvent.click(button)
    expect(history.location.pathname).toBe('/registration')
  })
  it('Should redirect to /search when clicking the "Buscar" link', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <Header></Header>
      </Router>
    )

    const button = component.getByText(/buscar/i)
    fireEvent.click(button)
    expect(history.location.pathname).toBe('/search')
  })
  it('Should redirect to / when clicking the "Inicio" link', async () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <Header></Header>
      </Router>
    )

    const button = component.getByText(/inicio/i)
    fireEvent.click(button)
    expect(history.location.pathname).toBe('/')
  })
  it('Should change the link from "Inicia Sesion" to "Cerrar Sesion" ', async () => {
    const component = render(
      <BrowserRouter>
        <Header></Header>
      </BrowserRouter>,
      {
        preloadedState: {
          user: {
            currentUser: 'Daniel'
          }
        }
      }
    )
    component.getByText(/cerrar sesion/i)
  })
  it('Should appear the link for access my account call "Mi Cuenta" ', async () => {
    const component = render(
      <BrowserRouter>
        <Header></Header>
      </BrowserRouter>,
      {
        preloadedState: {
          user: {
            currentUser: 'Daniel'
          }
        }
      }
    )
    component.getByText(/mi cuenta/i)
  })
})
