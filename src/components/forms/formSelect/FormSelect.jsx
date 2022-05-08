import React from 'react'
import { Form } from 'react-bootstrap'
import './FormSelect.css'

const FormSelect = ({
  options,
  defaultValue,
  handleChange,
  label,
  selectStyle,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null

  return (
    <div>
      {label && <label className='mb-2'>{label}</label>}

      <Form.Select
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
        className='mb-3'
      >
        {options.map((option, index) => {
          const { value, name } = option

          return (
            <option key={index} value={value}>
              {name}
            </option>
          )
        })}
      </Form.Select>
    </div>
  )
}

export default FormSelect
