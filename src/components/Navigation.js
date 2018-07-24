import React from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from './Logout';

const Navigation = ({ user }) =>
  <div>
    {user
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/Dashboard'>Dashboard</Link></li>
    <li><Link to='/account'>Account</Link></li>
    <li><LogoutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/signup'>Signup</Link></li>
  </ul>

export default Navigation;