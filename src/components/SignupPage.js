import React from 'react';
import { auth, database } from '../firebase/firebase'
import { startAddUser } from '../actions/users'
import { connect } from 'react-redux'
import SignupForm from './SignupForm'
import StyledFirebaseLogin from './StyledFirebaseLogin'

export class SignupPage extends React.Component {
  state = {
    error: ''
  }
  onSubmit = (user) => {
    this.props.startAddUser('emailAndPassword', user)
      .then(() => {
        this.props.history.push('/')
      })
      .catch((error) => {
        this.setState(() => ({ error: error.message }))
      })
  }

  render() {

    return (
      <div className="flex justify-center">
        <div className="tc w-100 w-50-m w-30-l">
          <div className="f5 blue fw5 ttu tracked mt5">Welcome and join us today!</div>
          <div className="mv1">
            <StyledFirebaseLogin onClick={this.onSubmit}/>
          </div>
          <div className="f5 gray fw5 ttu tracked">OR</div>
          <SignupForm onSubmit={this.onSubmit} formType='signup' />
          {!!this.state.error && <p>{this.state.error}</p>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  users: state.users
})
const mapDispatchToProps = (dispatch) => ({
  startAddUser: (emailAndPassword, user) => dispatch(startAddUser(emailAndPassword, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)

