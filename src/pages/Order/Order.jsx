import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderDetailStart } from '../../redux/Orders/orders.actions'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import { formatter } from '../../Utils'

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
})

function Order() {
  const { orderID } = useParams()
  const dispatch = useDispatch()
  const { orderDetails } = useSelector(mapState)
  const { orderTotal } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetailStart(orderID))
  }, [])

  return (
    <div className='container mt-4'>
      <h1>Numero de order #{orderID}</h1>
      <h3>Total {formatter.format(orderTotal)}</h3>
      <OrderDetails order={orderDetails}></OrderDetails>
    </div>
  )
}

export default Order
