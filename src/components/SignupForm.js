import React from 'react';
import Button from './Button'
import { Link } from 'react-router-dom'

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user ? props.user.email : '',
      passwordOne: props.user ? props.user.passwordOne : '',
      passwordTwo: props.user ? props.user.passwordTwo : '',
      error: ''
    }
  }
  onEmailChange = (e) => {
    const email = e.target.value
    return this.setState(() => ({ email }))
  }
  onPasswordOneChange = (e) => {
    const passwordOne = e.target.value
    return this.setState(() => ({ passwordOne }))
  }
  onPasswordTwoChange = (e) => {
    const passwordTwo = e.target.value
    return this.setState(() => ({ passwordTwo }))
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.email) {
      this.setState(() => ({ error: 'Please provide email.' }))
    } else if (this.props.formType === 'signup' && this.state.passwordOne !== this.state.passwordTwo) {
      this.setState(() => ({ error: 'Password does not match. Pleae enter the correct password' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit('email', {
        email: this.state.email,
        passwordOne: this.state.passwordOne,
        passwordTwo: this.state.passwordTwo
      })
    }
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      email
    } = this.state

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            className="br2 f6 db w-100 pv3 ph2 mv3 ba b--black-20"
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.onEmailChange}
          />
          <input
            className="br2 f6 db w-100 pv3 ph2 mv3 ba b--black-20"
            type="text"
            placeholder="Password"
            value={passwordOne}
            onChange={this.onPasswordOneChange}
          />
          {
            this.props.formType === 'signup' &&
            <input
              className="br2 f6 db w-100 pv3 ph2 mv3 ba b--black-20"
              type="text"
              placeholder="Confirm Password"
              value={passwordTwo}
              onChange={this.onPasswordTwoChange}
            />
          }
          {
            this.props.formType === 'login' &&
            <div className="tl mt2 mb3">
              <Link
                to="/PasswordForgotPage"
                className="f7 fw2 gray"
              >
                Forgot your password?
            </Link>
            </div>

          }
          <Button>
            {this.props.formType === 'signup' ? 'Signup' : 'Login'}
            {this.state.error && <p>{this.state.error}</p>}
          </Button>
          {
            this.props.formType === 'login' &&
            <div className="f7 fw2 mv4">
              <span className="dark-gray no-underline">Dont' have an account? </span>
              <Link to="/sinup" className="blue fw4">Sign up now!</Link>
            </div>

          }
        </form>
      </div >
    )
  }
}

