import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'


const AccountPage = () => (
  <Container>
    <h1>Account</h1>
    <div className="flex flex-column">
      <div className="flex">
        <Link to="/account/view-profile" className="w-20 link">View Profile</Link>
        <p className="w-80">The information you share with the community.</p>
      </div>
      <div className="flex">
        <Link to="/account/edit-profile" className="w-20 link">Edit Profile</Link>
        <p className="w-80">Share your expertises, interests and experience.</p>
      </div>
    </div>
  </Container>
)

export default AccountPage