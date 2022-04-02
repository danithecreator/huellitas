import React from 'react'
import './Button.css'
const Button = ({ children, type, ...otherProps }) => {
  return (
    <button className={type} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
