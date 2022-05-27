import ordersTypes from './orders.types'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder
} from './orders.helpers'
import { auth } from '../../firebase/utils'
import { clearCart } from '../Cart/cart.actions'
import { setOrderDetails, setUserOrderHistory } from './orders.actions'

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload)
    yield put(setUserOrderHistory(history))
  } catch (error) {
    console.log(error)
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  )
}

export function* saveOrder({ payload }) {
  try {
    const date = new Date()
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: date
    })
    yield put(clearCart())
  } catch (error) {
    console.log(error)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder)
}

export function* getOrderDetail({ payload }) {
  try {
    const order = yield handleGetOrder(payload)
    yield put(setOrderDetails(order))
  } catch (error) {
    console.log(error)
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetail)
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart)
  ])
}
