import React from 'react'
import './Modal.css'

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null

  return [
    <div className='modalOverlay' onClick={() => toggleModal()} />,
    <div className='modalWrap'>
      <div className='modalContainer'>{children}</div>
    </div>
  ]
}

export default Modal
