import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import './checkout.css'
//import Button from './../forms/button/Button';
import Item from './Item/item'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'

const mapState = createStructuredSelector({
  carItems: selectCartItems,
  total: selectCartTotal
})

const Checkout = ({}) => {
  const history = useHistory()
  const { carItems, total } = useSelector(mapState)

  const errMsg = 'No hay productos en el carrito'

  return (
    <div className='container'>
      <h1 className='mt-3 mb-5'>Carrito</h1>
      {carItems.map((item, pos) => {
        return <Item key={pos} {...item}></Item>
      })}
      <h3 className='mt-5'>Total: ${total}</h3>
      <section className='mt-4'>
        <Button
          variant='secondary'
          className=' me-4'
          onClick={() => history.goBack()}
        >
          Seguir comprando
        </Button>
        <Button onClick={()=> history.push('/payment')}  className='cartBtn'>Verificar</Button>
      </section>
    </div>

    /*  <div className='container'>
      <br></br>
      <h1>Carrito</h1>

      <div className='container'>
        {carItems.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <table>
                  <tbody>
                    {carItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table>
                  <tr>
                    <h3>Total: ${total}</h3>
                  </tr>

                  <tr>
                    <td>
                      <Button
                        variant='secondary'
                        onClick={() => history.goBack()}
                      >
                        Seguir comprando
                      </Button>
                    </td>
                    <td>
                      <Button variant='secondary'>Verificar</Button>
                    </td>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{errMsg}</p>
        )}
      </div>
    </div> */
  )
}

export default Checkout
