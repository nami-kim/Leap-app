import React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default class EmojiPicker extends React.Component {
  constructor(props) {
    super(props)
  }
  onSelectEmoji = (emoji) => {
    console.log(emoji)
    this.props.onSubmit(emoji)
  }

  render() {
   
    return (
      <div>
        <Picker
          set='emojione'
          title='Pick your emoji…'
          emoji='point_up'
          style={this.props.style}
          emojiSize={18}
          onSelect={this.onSelectEmoji}
          emojiTooltip={true}
          showPreview={false}
          
        />

      </div>
    )
  }
}



