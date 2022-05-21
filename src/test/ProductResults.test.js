import ProductResults from '../components/Products/ProductResults'
import { render, screen, fireEvent } from '../test-utils'

import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom'

describe('Testing the product result page', () => {
  it('Should render the page whitout problems', () => {
    const history = createMemoryHistory({
      initialEntries: ['/search/perros/cuidado']
    })
    const component = render(
      <Router history={history}>
        <ProductResults></ProductResults>
      </Router>,
      {
        preloadedState: {
          productsData: {
            products: {
              data: [
                {
                  productThumbnail:
                    'https://firebasestorage.googleapis.com/v0/b/huellitas-e564f.appspot.com/o/productImages%2Fcoste.gif?alt=media&token=e0f56bc4-71dc-42c8-be39-aa72874bc3ca',
                  productName: 'Advocate - Perros Hasta 4 Kg.',
                  productSellPrice: '13000',
                  documentID: 'dIqJosfl5Ya9wwFR1oQC'
                }
              ],
              queryDoc: '1',
              isLastPage: true
            }
          }
        }
      }
    )
    const product = component.getByRole('list')
    expect(product.textContent).toEqual(
      'Advocate - Perros Hasta 4 Kg.$13000Agregar al Carrito'
    )
  })
})
