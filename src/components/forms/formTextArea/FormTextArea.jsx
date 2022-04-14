import React from 'react'
import './FormTextArea.css'

const FormTextArea = ({
  handleChange,
  styleclass,
  label,
  type,
  ...otherProps
}) => {
  return (
    <div className='formRowArea'>
      {label && <label>{label}</label>}

      <textarea
        className={styleclass}
        type={type}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  )
}

export default FormTextArea
