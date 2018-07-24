import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { startSetUsers } from '../actions/users'
import withAuthorization from './withAuthorization';
import { firebase } from '../firebase/firebase'

export class AdminPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.startSetUsers()
  }
  render() {
    var user = firebase.auth().currentUser;
    let { name, email, photoUrl, uid, emailVerified } = user

    if (user != null) {
      name = user.displayName,
        email = user.email,
        photoUrl = user.photoURL,
        emailVerified = user.emailVerified,
        uid = user.uid // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
    return (
      <div>

        <div>
          <h1>Admin Page</h1>
          <h2>current user in firebase</h2>
          {user.email}
          {!!this.props.users && <UserList users={this.props.users} />}

        </div>

        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </div>

    )
  }
}
const UserList = ({ users }) =>
  <div>
    
    <h2>List of Email Addresses of Users in State</h2>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].email}</div>
    )}
  </div>

const mapStateToProps = (state) => ({
  users: state.users,
  authUser: state.authUser
});

const mapDispatchToProps = (dispatch) => ({
  startSetUsers: () => dispatch(startSetUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);