const userReducerDefaultState = []

function userReducer(state = userReducerDefaultState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.user
      ]
    case 'UPDATE_USER':
      return {
        ...state,
        updates
      }
    case 'REMOVE_USER':
      return state.filter(({ postId }) => {
        postId !== action.postId
      })
    case 'SET_USERS':
      return action.users

    default:
      return state;
  }
}

export default userReducer;