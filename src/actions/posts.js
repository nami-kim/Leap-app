import { database } from '../firebase/firebase'
import moment from 'moment'
import _ from 'lodash/fp'

// create post
export const addPost = (post) => ({
  type: 'ADD_POST',
  post
})
// start create post
export const startAddPost = (postData = {}) => {
  return (dispatch, getState) => {
    const {
      uid = getState().authUser.uid,
      name = getState().users.find((user) => {
        return user.uid === uid
      }).name,
      title = '',
      website = '',
      note = '',
      topic = '',
      anonymous = false,
      createdAt = 0,
    } = postData
    const post = { uid, name, title, website, note, topic, anonymous, createdAt }

    return database.ref('posts').push(post).then((ref) => {
      dispatch(addPost({
        postId: ref.key,
        ...post
      }))
    })
  }
}

// remove post
export const removePost = ({ uid, postId } = {}) => ({
  type: 'REMOVE_POST',
  uid,
  postId,
})
// start remove post
export const startRemovePost = ({ uid, postId } = {}) => {
  return (dispatch, getState) => {
    if ({ uid } === getState().auth.uid) {
      return database.ref(`posts/${postId}`).remove().then(() => {
        dispatch(removePost({ uid, postId }))
      })
    }
    return
  }
}
// edit post
export const editPost = (postId, updates) => ({
  type: 'EDIT_POST',
  postId,
  updates
})
// start edit post
export const startEditPost = (uid, postId, updates) => {
  return (dispatch, getState) => {
    if (uid === getState().authUser.uid) {
      return database.ref(`posts/${postId}`).update(updates).then(() => {
        console.log('here')
        dispatch(editPost(postId, updates))
      })
    }
  }
}
// add emoji
export const addEmoji = (postId, emoji, uid) => ({
  type: 'ADD_EMOJI',
  postId,
  emoji,
  uid
})
// start add emoji
export const startAddEmoji = (postId, emoji) => {
  return (dispatch, getState) => {
    const uid = getState().authUser.uid
    const post = getState().posts.find((post) => {
      return post.postId === postId
    })
  
    const currentEmoji = post.emojis ? post.emojis.find(({ unified }) => unified === emoji.unified) : false
    const emojiExists = !!currentEmoji
    const userExists = emojiExists ? !!currentEmoji.uids.find((emojiUid) => emojiUid === uid) : false


    if (!emojiExists) {
      return database.ref(`posts/${postId}/emojis/${emoji.unified}`)
        .set(emoji)
        .then(() => database.ref(`posts/${postId}/emojis/${emoji.unified}/uids/${uid}`).set({ uid }))
        .then(() => {
          dispatch(addEmoji(postId, emoji, uid))
        })
    } else if (emojiExists && !userExists) {
      return database.ref(`posts/${postId}/emojis/${emoji.unified}/uids/${uid}`).set({ uid })
        .then(() => {
          dispatch(addEmoji(postId, emoji, uid))
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
        const emojiUserArray = emojiArray.map((emoji) => {
          return { ...emoji, uids: Object.keys(emoji.uids) }
        })

        posts.push({
          postId: childSnapshot.key,
          ...childSnapshot.val(),
          emojis: emojiUserArray
        })
      })
      dispatch(setPosts(posts));
    })
  };
};




