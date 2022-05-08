import React from 'react'
import { Form } from 'react-bootstrap'
import './FormInput.css'
const FormInput = ({
  handleChange,
  styleclass,
  label,
  type,
  ...otherProps
}) => {
  return (
    <Form.Group className='mb-3 w-100'>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} onChange={handleChange} {...otherProps} />
    </Form.Group>
  )
}

export default FormInput
