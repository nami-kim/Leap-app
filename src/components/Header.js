import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="row between">
    <div className="">
      <Link className="col-sm-12 col-md-4" to="/dashboard">
        <h1>Leap</h1>
      </Link>
      <input className="col-sm-12 col-md-4" type="text" placeholder="Search for a member or post" />
      <button className="col-sm-12 col-md-4 button button--link" onClick={startLogout}>Logout</button>
    </div>

  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
