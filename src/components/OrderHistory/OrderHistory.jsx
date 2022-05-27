import React from 'react'
import { Row } from 'react-bootstrap'
import moment from 'moment'
import { formatter } from '../../Utils'
import './OrderHistory.css'
import { useHistory } from 'react-router-dom'

export default function OrderHistory({ orders }) {
  const history = useHistory()

  const formateDate = (date) => {
    return moment(date.nano).format('DD/MM/YYYY')
  }

  return (
    <div className='container'>
      <Row className='order__tableHeader'>
        <div className='col-4 fw-bold'>Fecha</div>
        <div className='col-4 fw-bold'>Codigo</div>
        <div className='col-4 fw-bold'>Total</div>
      </Row>
      {Array.isArray(orders) &&
        orders.length > 0 &&
        orders.map((order, pos) => {
          const { documentID } = order
          return (
            <Row
              key={pos}
              className='shadow p-3 mb-5 bg-body rounded order__tableRow d-flex align-items-center'
              onClick={() => history.push(`/order/${documentID}`)}
            >
              {console.log(order)}
              <div className='col-4 border-end'>
                {formateDate(order.orderCreatedDate)}
              </div>
              <div className='col-4 text-break border-end'>
                {order.documentID}
              </div>
              <div className='col-4 '>{formatter.format(order.orderTotal)}</div>
            </Row>
          )
        })}
    </div>
  )
}
