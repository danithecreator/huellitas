import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutUserStart } from '../redux/User/user.actions'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import VerticalNav from '../components/VerticalNav/VerticalNav'
import { Button, Offcanvas } from 'react-bootstrap'

const AdminLayout = (props) => {
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(signOutUserStart())
  }
  return (
    <div className=' '>
      <Header {...props} />

      <div className='mt-4'>{props.children}</div>

      <Footer />
    </div>
  )
}
export default AdminLayout
