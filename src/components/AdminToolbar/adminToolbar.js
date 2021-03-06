import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from '../../Utils'
import './adminToolbar.css'

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const AdminToolbar = (_props) => {
  const { currentUser } = useSelector(mapState)

  const isAdmin = checkUserIsAdmin(currentUser)
  if (!isAdmin) return null

  return (
    <div className='adminToolbar'>
      <ul>
        <li>
          <Link to='/admin'>Panel de administrador</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminToolbar
