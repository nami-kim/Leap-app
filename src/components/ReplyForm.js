import React from 'react'
import { ReplyButton, FollowButton, SecondReplyBtn } from './Button'
import moment from 'moment'
import { startAddReply } from '../actions/replies'
import { connect } from 'react-redux'


export class ReplyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replyVisibility: false,
      note: '',
      anonymous: false,
      createdAt: moment(),
      error: '',
    }
  }
  
  onReplyVisibilityToggle = (e) => {
    e.preventDefault()
    this.setState(() => ({ replyVisibility: !this.state.replyVisibility }))
  }
  onReplyNoteChange = (e) => {
    const note = e.target.value
    this.setState(() => ({ note }))
  }
  onAnonymousChange = (e) => {
    const anonymous = e.target.value
    this.setState(() => ({ anonymous }))
  }
  onSubmitReply = (e) => {
    e.preventDefault()
    const reply = {
      note: this.state.note,
      anonymous: this.state.anonymous,
      createdAt: this.state.createdAt.valueOf(),
    }
console.log(reply)
console.log(this.props.postId)
    this.props.startAddReply(this.props.postId, reply)
      .then(() => this.setState(() => ({
        replyVisibility: false,
        note: '',
        anonymous: false,
        createdAt: moment(),
        error: '',})))
  }
  render() {
    return (
      <div className="w-100">
        <div className={this.state.replyVisibility ? "dn" : "w-100 mv2"}>
          <ReplyButton onClick={this.onReplyVisibilityToggle}>Reply to {this.props.name}</ReplyButton>
          <span><ReplyButton className="white bg-green-custom">Follow</ReplyButton></span>
        </div>
        <div className={this.state.replyVisibility ? "w-100" : "dn"}>
          <form onSubmit={this.onSubmitReply}>
            <textarea
              className="f6 fw4 lh-copy w-100 db w-100 pa2 mv3 ba b--black-20 h3"
              placeholder="Write your reply here (mention users with @)"
              value={this.state.note}
              onChange={this.onReplyNoteChange}
            >
            </textarea>
            <div className="flex mv3 f6 fw4">
              <input
                onChange={this.onAnonymousChange}
                className=" db w1 mr1 ba b--black-20"
                type="checkbox"
                value={this.state.anonymous}
                onChange={this.onAnonymousChange}
              />
              <span>Post anonymously. Click here to learn more</span>
            </div>
            <div>
              <ReplyButton>Save</ReplyButton>
              <ReplyButton
                onClick={this.onReplyVisibilityToggle}
                className="dark-gray bg-white">
                Close
            </ReplyButton>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  startAddReply: (postId, reply) => dispatch(startAddReply(postId, reply))
})

export default connect(undefined, mapDispatchToProps)(ReplyForm)


