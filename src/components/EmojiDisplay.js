import React from 'react'

export default class EmojiDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  onUpdateEmoji = (emoji) => {
    this.props.startAddEmojiReply(this.props.postId, emoji)
  }
  render() {
    return (
      <div>
        {
          this.props.emojis && this.props.emojis.map((emoji) => (
            <button
              className="pv1 br2"
              onClick={() => this.onUpdateEmoji(emoji)}
              key={emoji.unified}>
              <span>{emoji.native}</span>
              <span className="gray f7">{emoji.uids.length}</span>
            </button>
          )).sort((a, b) => {
            return a.key > b.key ? 1 : -1
          })
        }
      </div>
    )
  }
}
