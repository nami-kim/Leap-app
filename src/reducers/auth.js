export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    case 'RESET_PASSWORD':
      return {
        email: action.email
      };
    case 'UPDATE_PASSWORD':
      return {
        password: action.password
      };
    case 'SET_USER':
      return action.authUser
    default:
      return state;
  }
};
