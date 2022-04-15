import React from 'react'
import Button from '../forms/button/Button'

function LoadMore({ onLoadMoreEvt = () => {} }) {
  return (
    <Button type='btnDashboard' onClick={() => onLoadMoreEvt()}>
      Cargar Mas
    </Button>
  )
}

export default LoadMore
