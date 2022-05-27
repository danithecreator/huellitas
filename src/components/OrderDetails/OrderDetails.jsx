import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setOrderDetails } from '../../redux/Orders/orders.actions'
import { formatter } from '../../Utils'
import './OrderDetails.css'
function OrderDetails({ order }) {
  const orderItems = order && order.orderItems
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(setOrderDetails({}))
  }, [])
  return (
    <div className='mt-5'>
      <Row className='order__tableHeader   d-flex align-items-center'>
        <div className='col-3 fw-bold border-end d-none d-lg-block'>Imagen</div>
        <div className='col-4 col-sm-4  col-lg-3 fw-bold border-end'>
          Nombre
        </div>
        <div className='col-4 col-sm-4 col-lg-3 fw-bold border-end'>Precio</div>
        <div className=' col-4 col-sm-4 col-lg-3 fw-bold border-end'>
          Cantidad
        </div>
      </Row>

      {Array.isArray(orderItems) &&
        orderItems.length > 0 &&
        orderItems.map((singleOrder, pos) => {
          console.log(singleOrder)
          return (
            <Row
              className='order__tableHeader  d-flex align-items-center '
              key={pos}
            >
              <div className='col-3 fw-bold d-none d-lg-block'>
                <img
                  src={singleOrder.productThumbnail}
                  className='orderDetails__img '
                  alt='product image'
                />
              </div>
              <div className='col-4 col-sm-4  col-lg-3 h-100 fw-bold'>
                {singleOrder.productName}
              </div>
              <div className='col-4 col-sm-4  col-lg-3 fw-bold '>
                {formatter.format(singleOrder.productSellPrice)}
              </div>
              <div className='col-4 col-sm-4  col-lg-3 fw-bold '>
                {singleOrder.quantity}
              </div>
            </Row>
          )
        })}
    </div>
  )
}

export default OrderDetails
