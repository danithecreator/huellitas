import ProductCard from '../components/ProductCard/ProductCard'
import { render, screen, fireEvent } from '../test-utils'

import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom'

describe('Testing the product card', () => {
  it('Should render the product card whitout problems ', () => {
    const history = createMemoryHistory({ initialEntries: ['/search/perros'] })
    const component = render(
      <Router history={history}>
        <ProductCard></ProductCard>
      </Router>,
      {
        preloadedState: {
          productsData: {
            product: {
              productThumbnail:
                'https://firebasestorage.googleapis.com/v0/b/huellitas-e564f.appspot.com/o/productImages%2Fcoste.gif?alt=media&token=e0f56bc4-71dc-42c8-be39-aa72874bc3ca',
              productName: 'ZeeDog Super Orange - Naranja',
              productSellPrice: '13000',
              productBenefits:
                'Son blandas para su fácil digestión; con una alta palatividad, preparados y horneados muy cuidadosamente. Tu mascota tiene que el verdadero sabor natural.',
              productDescription:
                'Hechos con ingredientes naturales certificados como la carne y la fibra. Nuestras Gomitas están compuestas por proteína natural que se deshidrata para aumentar los beneficios al consumirla y eliminar cualquier tipo de bacteria. La fibra aporta a su digestion. Nuestro producto esta certificado por el ICA. Licencia de Venta ICA: No 15251-AL'
            }
          }
        }
      }
    )

    const name = component.getByRole('productName')
    const img = component.getByRole('productImg')
    const description = component.getByRole('des')
    const benefits = component.getByRole('ben')

    expect(name.textContent).toBe('ZeeDog Super Orange - Naranja')
    expect(img).toHaveAttribute('alt', 'product image')
    expect(description.textContent).toBe(
      ' Hechos con ingredientes naturales certificados como la carne y la fibra. Nuestras Gomitas están compuestas por proteína natural que se deshidrata para aumentar los beneficios al consumirla y eliminar cualquier tipo de bacteria. La fibra aporta a su digestion. Nuestro producto esta certificado por el ICA. Licencia de Venta ICA: No 15251-AL'
    )
    expect(benefits.textContent).toBe(
      ' Son blandas para su fácil digestión; con una alta palatividad, preparados y horneados muy cuidadosamente. Tu mascota tiene que el verdadero sabor natural.'
    )
  })
})
