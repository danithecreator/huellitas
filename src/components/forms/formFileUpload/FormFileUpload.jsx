import React, { useState } from 'react'
import './FormFileUpload.css'
function FormFileUpload({ handleUpload, uploadValue }) {
  return (
    <div className='uploadFile__container'>
      <input
        className='uploadFile__button'
        type='file'
        onChange={handleUpload}
      />
      <progress
        className='uploadFile__bar'
        value={uploadValue}
        max='100'
      ></progress>
    </div>
  )
}

export default FormFileUpload
