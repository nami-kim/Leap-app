import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
 
export class BurgerMenu extends React.Component {
  showSettings(e) {
    e.preventDefault();
  }
  
  render() {
    return (
      <Menu right isOpen={false} className="">
        <Link id="home" className="menu-item" to="/">Home</Link>
        <Link id="Linkbout" className="account" to="/account">Account</Link>
        <Link id="contact" className="contact" to="/contact">Contact</Link>
        <Link onClick={this.props.startLogout} to="/">Logout</Link>
        <Link onClick={this.showSettings} className="menu-item--small" to="">Settings</Link>
      </Menu>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(BurgerMenu);