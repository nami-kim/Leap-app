import { auth, database } from '../firebase/firebase'

// add user
export const addUser = (user) => ({
  type: 'ADD_USER',
  user
})
// start add user
export const startAddUser = (loginType, userData = {}) => {
  console.log('startAddUser ran')
  if (loginType === 'emailAndPassword') {
    return (dispatch, getState) => {
      const {
        email = '',
        passwordOne = ''
      } = userData

      return auth.createUserWithEmailAndPassword(email, passwordOne)
        .then(({ user }) => {
          const uid = user.uid
          const email = user.email

          return database.ref(`users/${uid}`).set({email}).then((ref) => {
            dispatch(addUser({
              uid,
              email
            }))
          })
        })
    }
  } else if (loginType === 'social') {
    return (dispatch, getState) => {
      const uid = auth.currentUser.uid
      const email = auth.currentUser.email
      return database.ref(`users/${uid}`).set({email})
    }
  }
}
// update users
export const updateUser = (updates) => ({
  type: 'UPDATE_USERS',
  updates
})
// start update users: updates should be an object!
export const startUpdateUser = (updates) => {
  console.log('startUpdateUser ran', updates)
  return (dispatch, getState) => {
    const uid = getState().authUser.uid
    return database.ref(`users/${uid}`).set(updates).then(() => {
      dispatch(updateUser(updates))
    })
  }
}

// set users
export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
})
// start set users
export const startSetUsers = () => {
  return (dispatch) => {
    return database.ref('users').once('value').then((snapshot) => {
      const users = []
      snapshot.forEach((childSnapshot) => {
        users.push({
          uid: childSnapshot.key,
          ...childSnapshot.val()
        })
      })

      dispatch(setUsers(users));
    })
  };
}









