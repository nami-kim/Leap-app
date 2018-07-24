import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startResetPassword } from '../actions/auth'

// export const PasswordForgotPage = () => (
//   <div>
//     <h1>Forgot your password?</h1>
//     <PasswordForgotForm />
//   </div>
// )
export class PasswordForgotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      sentMessage: '',
      error: null
    }
  }

  onEmailChange = (e) => {
    const email = e.target.value
    return this.setState(() => ({ email }))
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('this.props', this.props)
    console.log(this.props.startResetPassword)
    this.props.startResetPassword(this.state.email)
      .then(() => {
        this.setState(({ sentMessage: 'New password has been sent to your email' }))
      })
      .catch(error => {
        this.setState(('error', error));
      });
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    return (
      <div>
        <h1>Forgot your password?</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={this.onEmailChange}
            type="text"
            placeholder="Email Address"
          />
          <button type="submit">
            Reset My Password
        </button>
          {this.state.sentMessage && <p>{this.state.sentMessage}</p>}
          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startResetPassword: (email) => dispatch(startResetPassword(email))
})

export default connect(undefined, mapDispatchToProps)(PasswordForgotPage)

