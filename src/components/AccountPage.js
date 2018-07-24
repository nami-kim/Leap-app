import React from 'react'

import { Link } from 'react-router-dom'



const AccountPage = () => (
  <div>
    <h1>Account</h1>
    <div>
      <Link to="/account/view-profile">View Profile</Link>
    </div>
    <div>
      <Link to="/account/edit-profile">Edit Profile</Link>
    </div>
   
  </div>
)

export default AccountPage