import React from 'react'
import { connect } from 'react-redux'
import ReplyListItem from './ReplyListItem'
import Container from './Container'

const ReplyList = (props) => (

    <div className="">
      {props.replies.map((reply) => {
        return <ReplyListItem key={reply.replyId} {...reply}/>
      })}
    </div>

)

const mapStateToProps = (state) => {
  return {
    replies: state.replies
  };
};
export default connect(mapStateToProps)(ReplyList)