import React from 'react'
import { connect } from 'react-redux'
import ReplyListItem from './ReplyListItem'
import _ from 'lodash/fp'

const ReplyList = (props) => {
  return (
    // replies have an array of ids
    // find ids -> map array of objects that have those ids
    <div>
      {!_.isUndefined(props.post.replies) && props.post.replies.map((replyId) => {
        return <ReplyListItem key={replyId} post={props.posts.find((post) => {
          return post.id === replyId
        })} />
      })}
      
    </div>
  )


}
export default ReplyList

