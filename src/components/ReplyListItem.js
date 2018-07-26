import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import EmojiPicker from './EmojiPicker'
import {ReplyButton, EmojiButton } from './Button'
import { startAddEmoji } from '../actions/posts'
import EmojiDisplay from './EmojiDisplay'
import ReplyForm from './ReplyForm'

class ReplyListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emojiVisibility: false
    }
  }
  
  handleToggleVisibility = (e) => {
    this.setState(() => ({
      emojiVisibility: !this.state.emojiVisibility
    }))
  }
  onSubmitEmoji = (emoji) => {
    console.log(this.props)
    console.log(this.props.post.id)
    console.log(this.props.post)
    this.props.startAddEmoji(this.props.post.id, emoji)
    this.setState(() => ({
      emojiVisibility: !this.state.emojiVisibility
    }))
  }
  render() {
    const { uid, emojis, id, name, note, anonymous, createdAt } = this.props.post
    const replyCreatedAt = moment(createdAt)
    const isAuthor = uid === this.props.authUser.uid
    return (
      <div className="flex pa2 mh2">
        <div className="w-10 mv1">
          Profile Photo
        </div>
        <div className="w-90 flex flex-column">
          <div className="w-100 gray f6 mb1 pv1">
            <span className="black">{anonymous ? 'anonymous' : name}</span>
            <span className="mh1">·</span>
            <span>0 replies</span>
            <span className="mh1">·</span>
            <span>{replyCreatedAt.startOf('hour').fromNow()}</span>
          </div>
          <div className="w-100 mv2 pv1 f5">
          {note}
          </div>
          <div className="w-100 mv1 flex flex-wrap">
            <span><EmojiButton onClick={this.handleToggleVisibility}>+ emoji</EmojiButton></span>
            <EmojiDisplay
              emojis={emojis}
              startAddEmoji={this.props.startAddEmoji}
              id={id} />
            <div className={this.state.emojiVisibility ? "" : "dn"}>
              <EmojiPicker
                onSubmit={this.onSubmitEmoji}
                style={{ position: 'relative', top: '30px' }}
              />
            </div>
          </div>
          <div className="mv2 flex items-center">
            <span className={isAuthor ? "mv3" : "dn"}>
              <ReplyButton className="black bg-light-gray">Remove</ReplyButton>
            </span>
            <ReplyForm post={this.props.post} type="reply" />
          </div>
        </div>
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmoji: (id, emoji) => dispatch(startAddEmoji(id, emoji))
})

const mapStateToProps = (state) => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyListItem)