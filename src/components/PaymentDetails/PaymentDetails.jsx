import React, { useState, useEffect } from 'react'
import FormInput from '../forms/formInput/FormInput'

import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { saveOrderHistory } from '../../redux/Orders/orders.actions'
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal
} from '../../redux/Cart/cart.selectors'
import { clearCart } from '../../redux/Cart/cart.actions'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const initialAddresState = {
  line1: '',
  line2: ''
}

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  itemCount: selectCartItemsCount
})

const PaymentDetails = () => {
  const history = useHistory()
  const { itemCount, total, cartItems } = useSelector(mapState)
  const dispatch = useDispatch()
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddresState
  })
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddresState
  })
  const [recipientName, setRecipientName] = useState('')
  const [nameOnCard, setNameOncard] = useState('')
  const [number, setNumber] = useState('')

  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

  useEffect(() => {
    if (itemCount < 1) {
      history.push('/dashboard')
    }
  }, [itemCount])

  const handleShipping = (evt) => {
    const { name, value } = evt.target
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    })
  }

  const handleBilling = (evt) => {
    const { name, value } = evt.target
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  }

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    if (!shippingAddress.line1 || !recipientName || !nameOnCard) {
      return
    }
    const configOrder = {
      orderTotal: total,
      orderItems: cartItems.map((item) => {
        const {
          documentID,
          productThumbnail,
          productName,
          productSellPrice,
          quantity
        } = item

        return {
          documentID,
          productThumbnail,
          productName,
          productSellPrice,
          quantity
        }
      })
    }
    dispatch(saveOrderHistory(configOrder))
  }
  const formatExpiry = (value) => {
    return (
      value
        .replace(/\D/g, '')
        .match(/.{1,2}/g)
        ?.join('/')
        .substr(0, 5) || ''
    )
  }
  const formatCardnumber = (value) => {
    return (
      value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || ''
    )
  }
  const formatCVC = (value) => {
    return value.replace(/\D/g, '').substr(0, 3) || ''
  }
  return (
    <div className='container'>
      <form onSubmit={handleFormSubmit}>
        <div className='container'>
          <h2 className=' mt-5'>Dirección de Envio</h2>

          <FormInput
            required
            placeholder='Nombre del destinatario'
            name='recipientName'
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type='text'
          ></FormInput>

          <FormInput
            required
            placeholder='Direccion de envio'
            name='line1'
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line1}
            type='text'
          ></FormInput>

          <FormInput
            placeholder='Informacion adicional'
            name='line2'
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line2}
            type='text'
          ></FormInput>
        </div>

        <div className='container'>
          <h2 className=' mt-5'>Informacion de pago</h2>
          <form className=''>
            <div className='row d-flex flex-column'>
              <FormInput
                type='tel'
                name='number'
                placeholder='Numero de la tarjeta'
                value={number}
                onChange={(e) => {
                  const { value } = e.target
                  e.target.value = formatCardnumber(value)
                  setNumber(e.target.value)
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
              <FormInput
                type='text'
                name='name'
                placeholder='Nombre en la tarjeta'
                value={nameOnCard}
                onChange={(e) => setNameOncard(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />

              <FormInput
                type='text'
                name='expiry'
                placeholder='Fecha de expiracion'
                value={expiry}
                onChange={(e) => {
                  const { value } = e.target
                  e.target.value = formatExpiry(value)
                  setExpiry(e.target.value)
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
              <FormInput
                type='tel'
                name='cvc'
                placeholder='CVV'
                value={cvc}
                onChange={(e) => {
                  const { value } = e.target
                  e.target.value = formatCVC(value)
                  setCvc(e.target.value)
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <Cards
              number={number}
              name={nameOnCard}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
              className='m-0'
            ></Cards>
          </form>
        </div>
        <button type='submit' className='btn btn-primary cartBtn mt-5  '>
          Realizar Pago
        </button>
      </form>
    </div>
  )
}

export default PaymentDetails
