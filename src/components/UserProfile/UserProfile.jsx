import React from 'react'
import './UserProfile.css'


const UserProfile = (props) => {
  const { currentUser } = props
  const { displayName } = currentUser

  return (
    <div className='userProfile'>
      <ul>
        <li>
          <span className='displayName'>{displayName}</span>
        </li>
      </ul>
    </div>
  )
}

export default UserProfile
