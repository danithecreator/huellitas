import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderHistory from '../../components/OrderHistory/OrderHistory'
import { getUserOrderHistory } from '../../redux/Orders/orders.actions'

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
})

const Dashboard = () => {
  const dispatch = useDispatch()
  const { currentUser, orderHistory } = useSelector(mapState)
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id))
  }, [])
  return (
    <div className='admin container mt-4'>
      <h1 className='mb-5'>Historial de compras</h1>
      <OrderHistory orders={orderHistory}></OrderHistory>
    </div>
  )
}

export default Dashboard
