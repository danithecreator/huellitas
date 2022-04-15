import React from 'react'
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
    <div className={selectStyle}>
      {label && <label>{label}</label>}

      <select value={defaultValue} onChange={handleChange} {...otherProps}>
        {options.map((option, index) => {
          const { value, name } = option

          return (
            <option key={index} value={value}>
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormSelect
