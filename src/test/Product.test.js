import React from 'react'
import Product from '../components/Products/Product/Product'
import { render, screen, fireEvent } from '../test-utils'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'
const product = {
  productThumbnail:
    'https://firebasestorage.googleapis.com/v0/b/huellitas-e564f.appspot.com/o/productImages%2Faf948ecd5b15307a62e88602c4e400f5.jpg?alt=media&token=428b642b-e2b5-46fe-81c5-816fa3f693ee',
  productName: 'Equilibrio - Todas Las Razas Adulto',
  productSellPrice: '50000',
  documentID: '2EhlOBBYD6GbXnBcY0Tp'
}

describe('Testing the product component', () => {
  it('Should render the product whitout problems', () => {
    const component = render(
      <BrowserRouter>
        <Product {...product}></Product>
      </BrowserRouter>
    )
    component.getByText(/equilibrio - todas las razas adulto/i)
    component.getByText('$ 50.000')
    const button = component.getAllByText(/agregar al carrito/i)
    const thumb = component.getByRole('img')
    expect(thumb).toHaveAttribute('src', product.productThumbnail)
    expect(thumb).toHaveAttribute('alt', 'product thumb')
  })
  it('Should redirect the user to the detail of the product e.g(/product/BUyVOxU8L2ZH6RIhWIF9) when this one click the product card', () => {
    const history = createMemoryHistory()
    const component = render(
      <Router history={history}>
        <Product {...product}></Product>
      </Router>
    )

    const card = component.getByRole('productCard')
    fireEvent.click(card)
    expect(history.location.pathname).toBe(`/product/${product.documentID}`)
  })
})
