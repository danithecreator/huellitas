import React from 'react'
import './FormInput.css'
const FormInput = ({
  handleChange,
  styleclass,
  label,
  type,
  ...otherProps
}) => {
  return (
    <div className='formRow'>
      {label && <label>{label}</label>}

      <input
        className={styleclass}
        type={type}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  )
}

export default FormInput
