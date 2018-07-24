
import { auth, ui } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
})

export const startLogin = (email, password) => {
  return () => {
    return auth.signInWithEmailAndPassword(email, password)
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return auth.signOut()
  }
}

export const resetPassword = (email) => ({
  type: 'RESET_PASSWORD',
  email
})

export const startResetPassword = (email) => {
  return () => {
    return auth.sendPasswordResetEmail(email)
  }
}
export const updatePassword = (password) => ({
  type: 'UPDATE_PASSWORD',
  password
})

export const startUpdatePassword = (password) => {
  return () => {
    return auth.currentUser.updatePassword(password)
  }
}

// set authUser
export const setAuthUser = (authUser) => ({
  type: 'SET_USERS',
  authUser
})
// start set authUser
export const startSetAuthUser = () => {
  return (dispatch) => {
    const uid = getState().authUser.uid
    return database.ref(`users/${uid}`).once('value').then((authUser) => {
      dispatch(setUser(authUser));
    })
  };
}


