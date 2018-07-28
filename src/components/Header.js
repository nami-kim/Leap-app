import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerHeader } from './Container'

import BurgerMenu from './BurgerMenu'

export const Header = () => (
  <header className="bb-ns b--black-20 pv2-ns">
    <ContainerHeader>
      <div className="flex flex-wrap items-center">
        <div className="w-100 w-50-m w-third-ns pv2 pv0-ns">
          <Link className="no-underline blue f3 fw7" to="/dashboard">Leap Clone</Link>
        </div>
        <div className="w-100 w-50-m w-third-ns pv0">
          <input className="w-100 ba b--black-20 pa2 f5 " type="text" placeholder="Search for a member or post" />
        </div>
        <div className="w-100 w-third-ns pv0">
          <BurgerMenu />
        </div>
      </div>
    </ContainerHeader>
  </header>
);

export default Header
