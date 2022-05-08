import React, { useState } from 'react'
import { Form, ProgressBar } from 'react-bootstrap'
import './FormFileUpload.css'
function FormFileUpload({ handleUpload, uploadValue }) {
  return (
    // <div className='uploadFile__container'>
    //   <input
    //     className='uploadFile__button'
    //     type='file'
    //     onChange={handleUpload}
    //   />
    //   <ProgressBar now={uploadValue} />
    //   {/* <progress
    //     className='uploadFile__bar'
    //     value={uploadValue}
    //     max='100'
    //   ></progress> */}
    // </div>
    <Form.Group controlId='formFile' className='w-100 uploadFile__container'>
      <Form.Label>Sube la imagen del producto</Form.Label>
      <Form.Control type='file' onChange={handleUpload} />
      <ProgressBar className='mt-2' now={uploadValue} />
    </Form.Group>
  )
}

export default FormFileUpload
