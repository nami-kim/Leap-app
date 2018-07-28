import React from 'react'
import ReplyListItem from './ReplyListItem'
import { connect } from 'react-redux'

export class ReplyList extends React.Component {

  render() {
    console.log(this.props.posts)
    console.log(this.props.post)
    const replyArray = this.props.post.replies
    console.log(replyArray)
    const replyObjectArray = replyArray.map((replyId) => {
      return this.props.posts.find((post) => post.id === replyId)
    })
    console.log(replyObjectArray)
    return (
      <div>
        {replyArray !== [] && replyObjectArray.map((reply) => {
          return <ReplyListItem
            key={reply.id}
            replyTo={this.props.post.id}
            post={reply} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
})
export default connect(mapStateToProps)(ReplyList)

