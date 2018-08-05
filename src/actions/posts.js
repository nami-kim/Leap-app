import { database } from '../firebase/firebase'
import moment from 'moment'
import _ from 'lodash/fp'

// create post or reply item
export const addPost = (post) => ({
  type: 'ADD_POST',
  post
})
// start add post or reply item
export const startAddPost = (replyTo, postData = {}) => {
  return (dispatch, getState) => {
    const {
      title = '',
      website = '',
      note = '',
      topic = '',
      anonymous = false,
      createdAt = 0,
      type = '',
      replies = [],
      emojies = [],
      isRemoved = false,
    } = postData

    const uid = getState().authUser.uid

    const post = {
      type,
      uid,
      title,
      website,
      note,
      topic,
      anonymous,
      createdAt,
      replies,
      emojies,
      isRemoved
    }

    if (post.type === 'post') {
      return database.ref('posts').push(post).then((ref) => {
        const id = ref.key
        dispatch(addPost({
          id,
          ...post
        }))
      })
    } else if (post.type === 'reply') {
      return database.ref('posts').push(post)
        .then((ref) => {
          const id = ref.key
          dispatch(addPost({
            id,
            ...post
          }))

          database.ref(`posts/${replyTo}/replies/${id}`).set({ id }).then(() => {
            const currentReplyArray = getState().posts.find((post) => {
              return post.id === replyTo
            }).replies
            _.isUndefined(currentReplyArray) ? [] : currentReplyArray

            dispatch(editPost(replyTo,
              {
                replies: [
                  ...currentReplyArray,
                  id,
                ]
              }))
          })
        })

    }
  }
}


// remove post or reply
export const removePost = (id = '') => ({
  type: 'REMOVE_POST',
  id
})

// start remove post or reply
// uid check is not necessary as edit/remove buttons will be enabled for a creator only
export const startRemovePost = (id = '') => {
  return (dispatch, getState) => {
  
    console.log('startRemovePost is running')
    database.ref(`posts/${id}`).update({isRemoved: true}).then(() => {
      dispatch(removePost(id))
    })
  }
}


// edit post
export const editPost = (id, updates) => ({
  type: 'EDIT_POST',
  id,
  updates
})
// start edit post
export const startEditPost = (uid, id, updates) => {
  return (dispatch, getState) => {
    console.log(uid)
    console.log()
    console.log(updates)
    if (uid === getState().authUser.uid) {
      return database.ref(`posts/${id}`).update(updates).then(() => {
        console.log('here')
        dispatch(editPost(id, updates))
      })
    }
  }
}
// add emoji
export const addEmoji = (id, emoji, uid) => ({
  type: 'ADD_EMOJI',
  id,
  emoji,
  uid
})
// start add emoji
export const startAddEmoji = (id, emoji) => {
  return (dispatch, getState) => {
    const uid = getState().authUser.uid
    const post = getState().posts.find((post) => {
      return post.id === id
    })
    console.log(id)
    console.log(post)
    const currentEmoji = _.isUndefined(post.emojis) ? false : post.emojis.find(({ unified }) => unified === emoji.unified)
    const emojiExists = !!currentEmoji
    const userExists = !emojiExists || _.isUndefined(currentEmoji) ? false : currentEmoji.uids.find((emojiUid) => emojiUid === uid)


    if (!emojiExists) {
      return database.ref(`posts/${id}/emojis/${emoji.unified}`)
        .set(emoji)
        .then(() => database.ref(`posts/${id}/emojis/${emoji.unified}/uids/${uid}`).set({ uid }))
        .then(() => {
          dispatch(addEmoji(id, emoji, uid))
        })
    } else if (emojiExists && !userExists) {
      return database.ref(`posts/${id}/emojis/${emoji.unified}/uids/${uid}`).set({ uid })
        .then(() => {
          dispatch(addEmoji(id, emoji, uid))
        })
    }
  }
}
// set posts
export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts
})
// start set posts
export const startSetPosts = () => {
  return (dispatch, getState) => {
    return database.ref('posts').once('value').then((snapshot) => {
      const posts = []
      const emojis = []
      const users = []
      snapshot.forEach((childSnapshot) => {

        const emojiArray = _.values(childSnapshot.val().emojis)
        const replyArray = _.values(childSnapshot.val().replies)
        const emojiUserArray = emojiArray.map((emoji) => {
          return { ...emoji, uids: Object.keys(emoji.uids) }
        })
        const replyArrayReformatted = replyArray.map((reply) => {
          return reply.id
        })

        posts.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
          emojis: emojiUserArray,
          replies: replyArrayReformatted
        })
      })
      dispatch(setPosts(posts));
    })
  };
};




