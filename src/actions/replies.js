import { database } from '../firebase/firebase'
import moment from 'moment'
import _ from 'lodash/fp'

// reply to post
export const addReply = (reply) => ({
  type: 'ADD_REPLY',
  reply
})
// start reply to post
export const startAddReply = (postId = '', replyData = {}) => {
  return (dispatch, getState) => {
    const {
      replyToId = '',
      uid = getState().authUser.uid,
      name = getState().users.find((user) => {
        return user.uid === uid
      }).name,
      note = '',
      anonymous = false,
      createdAt = 0,
      replies = []
    } = replyData
    const reply = { postId, uid, replyToId, name, note, anonymous, createdAt, replies }
    console.log('postId', postId)
    console.log('reply: ', reply)
    return database.ref('replies').push(reply).then((ref) => {
      dispatch(addReply(({
        replyId: ref.key,
        ...reply
      })))
     
    })
  }
}
// add emoji for replies
export const addEmojiReply = (replyId, emoji, uid) => ({
  type: 'ADD_EMOJI',
  replyId,
  emoji,
  uid
})
// start add emoji for replies
export const startAddEmojiReply = (replyId, emoji) => {
  return (dispatch, getState) => {
    const uid = getState().authUser.uid
    const reply = getState().replies.find((reply) => {
      return reply.replyId === replyId
    })

    const currentEmoji = reply.emojis ? reply.emojis.find(({ unified }) => unified === emoji.unified) : false
    const emojiExists = !!currentEmoji
    const userExists = emojiExists ? !!currentEmoji.uids.find((emojiUid) => emojiUid === uid) : false


    if (!emojiExists) {
      return database.ref(`replies/${replyId}/emojis/${emoji.unified}`)
        .set(emoji)
        .then(() => database.ref(`replies/${replyId}/emojis/${emoji.unified}/uids/${uid}`).set({ uid }))
        .then(() => {
          dispatch(addEmoji(replyId, emoji, uid))
        })
    } else if (emojiExists && !userExists) {
      return database.ref(`replies/${replyId}/emojis/${emoji.unified}/uids/${uid}`).set({ uid })
        .then(() => {
          dispatch(addEmoji(replyId, emoji, uid))
        })
    }
  }
}
// set replies
export const setReplies = (replies) => ({
  type: 'SET_REPLIES',
  replies
})
// start set replies
export const startSetReplies = () => {
  return (dispatch, getState) => {
    return database.ref('replies').once('value').then((snapshot) => {
      const replies = []
      const emojis = []
      const users = []
      snapshot.forEach((childSnapshot) => {
        const emojiArray = _.values(childSnapshot.val().emojis)
        const emojiUserArray = emojiArray.map((emoji) => {
          return { ...emoji, uids: Object.keys(emoji.uids) }
        })

        replies.push({
          replyId: childSnapshot.key,
          ...childSnapshot.val(),
          emojis: emojiUserArray
        })
      })
      dispatch(setReplies(replies));
    })
  }
}


