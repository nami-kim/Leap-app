import _ from 'lodash/fp'

const defaultRepliesReducer = []

export default (state = defaultRepliesReducer, action) => {
  switch (action.type) {
    case 'ADD_REPLY':
      return [
        ...state,
        action.reply
      ]
    case 'SET_REPLIES':
      return action.replies
    default:
      return state
    }
  }