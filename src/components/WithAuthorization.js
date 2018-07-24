import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (!condition(user)) {
          this.props.history.push('/login');
        }
      });
    }

    render() {
      return this.props.user ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    user: state.sessionState.user,
  });

  return compose(
    connect(mapStateToProps),
  )(WithAuthorization);
}

export default withAuthorization;