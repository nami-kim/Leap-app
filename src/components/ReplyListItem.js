import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import EmojiPicker from './EmojiPicker'
import { EmojiButton } from './Button'
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
    this.props.startAddEmojiReply(this.props.replyId, emoji)
    this.setState(() => ({
      emojiVisibility: !this.state.emojiVisibility
    }))
  }
  render() {
    const { emojis, postId, name, note, anonymous, createdAt } = this.props
    const replyCreatedAt = moment(createdAt)

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
              startAddEmojiReply={this.props.startAddEmojiReply}
              postId={postId} />
            <div className={!this.state.emojiVisibility && "dn"}>
              <EmojiPicker
                onSubmit={this.onSubmitEmoji}
                style={{ position: 'absolute', top: '60px' }}
              >
              </EmojiPicker>
            </div>
          </div>
        </div>
        <div className="mv2 flex items-center">
          <ReplyForm {...this.props.post} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmojiReply: (replyId, emoji) => dispatch(startAddEmoji(replyId, emoji))
})

export default connect(undefined, mapDispatchToProps)(ReplyListItem)