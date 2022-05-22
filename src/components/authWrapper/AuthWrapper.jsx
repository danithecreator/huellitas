import React from 'react'
import './AuthWrapper.css'

const AuthWrapper = ({ _headline, children, size }) => {
  return (
    <div className='authWrapper'>
      <div className={size ? size : 'authWrapper__wrap'}>{children}</div>
    </div>
  )
}

export default AuthWrapper
