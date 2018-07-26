import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'


export class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>

        <div>
          <h1>Home</h1>
        </div>
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/account">Account</Link>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  authUser: state.authUser
})

export default connect(mapStateToProps, undefined)(HomePage)
