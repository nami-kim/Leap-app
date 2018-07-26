import _ from 'lodash/fp'

const defaultPostsReducer = []

export default (state = defaultPostsReducer, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ]
    case 'EDIT_POST':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            ...action.updates
          }
        } else {
          return post
        }
      })
    case 'REMOVE_POST':
      if (type === "reply") {
        return state.filter(({ id }) => id !== action.id)
      } else if (type === "post") {
        const postAndReplyIds = [...replies, action.id]
        return postAndReplyIds.map((postAndReplyId) => {
          return state.filter(({ id }) => id !== postAndReplyId)
        })
      }

    case 'ADD_EMOJI':
      return state.map((post) => {
        const { emojis = [] } = post
        const currentEmoji = emojis.find((emoji) => emoji.unified === action.emoji.unified)

        if (post.id === action.id) {
          return {
            ...post,
            emojis: _.isUndefined(currentEmoji) ? [
              ...emojis,
              {
                ...action.emoji,
                uids: [action.uid]
              }
            ] : [
                ...emojis.filter((emoji) => emoji.id !== action.emoji.id),
                {
                  ...action.emoji,
                  uids: [...currentEmoji.uids, action.uid]
                }
              ]
          }
        } else {
          return post
        }
      })
    case 'SET_POSTS':
      return action.posts
    default:
      return state
  }
}