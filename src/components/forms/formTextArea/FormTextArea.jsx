import React from 'react'
import { Form } from 'react-bootstrap'
import './FormTextArea.css'

const FormTextArea = ({
  handleChange,
  _styleclass,
  label,
  _type,
  ...otherProps
}) => {
  return (
    // <div className='formRowArea'>
    //   {label && <label>{label}</label>}

    //   <textarea
    //     className={styleclass}
    //     type={type}
    //     onChange={handleChange}
    //     {...otherProps}
    //   />
    // </div>

    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as='textarea'
        rows={3}
        onChange={handleChange}
        {...otherProps}
      />
    </Form.Group>
  )
}

export default FormTextArea
