import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import './checkout.css'

import Item from './Item/item'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Button } from 'react-bootstrap'
import { formatter } from '../../Utils'

const mapState = createStructuredSelector({
  carItems: selectCartItems,
  total: selectCartTotal
})

const Checkout = ({}) => {
  const history = useHistory()
  const { carItems, total } = useSelector(mapState)

  return (
    <div className='container'>
      <h1 className='mt-3 mb-5'>Carrito</h1>
      {carItems.map((item, pos) => {
        return <Item key={pos} {...item}></Item>
      })}
      <h3 className='mt-5'>Total: {formatter.format(total)}</h3>
      <section className='mt-4'>
        <Button
          variant='secondary'
          className=' me-4'
          onClick={() => history.goBack()}
        >
          Seguir comprando
        </Button>
        <Button onClick={() => history.push('/payment')} className='cartBtn'>
          Comprar
        </Button>
      </section>
    </div>
  )
}

export default Checkout
