import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { options } from './TopicSelect'
import EmojiPicker from './EmojiPicker'
import { EmojiButton } from './Button'
import { startAddEmoji } from '../actions/posts'
import EmojiDisplay from './EmojiDisplay'

class PostListItem extends React.Component {
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
    console.log(this.props.id)
    console.log(this.props)
    this.props.startAddEmoji(this.props.id, emoji)
    this.setState(() => ({
      emojiVisibility: !this.state.emojiVisibility
    }))
  }
  render() {
    const { emojis, id, name, title, website, topic, anonymous, createdAt } = this.props
    const postCreatedAt = moment(createdAt)

    const selectOption = options.find((option) => {
      return option.value === topic
    })

    const selectColor = selectOption ? selectOption.color : ''
    const topicLabel = selectOption ? selectOption.label : ''

    return (

      <div className="flex bb b--black-20 pv1">
        <div className="w-10 m1 ma1">
          Profile Photo
        </div>
        <Link to={`/posts/${id}`} className="no-underline black flex w-70">
          <div className="flex flex-column w-90">
            <div className="ma1">
              <span className="fw6 f5">{title}</span>
              <span className="fw2 f6 ph2">
                <span className="no-underline dark-blue" href={website}>{website}</span>
              </span>
            </div>
            <div className="flex gray f6 ma1">
              <span>{anonymous ? 'anonymous' : name}</span>
              <span className="mh1">·</span>
              <span>0 replies</span>
              <span className="mh1">·</span>
              <span>{postCreatedAt.startOf('hour').fromNow()}</span>
            </div>
            <div className="mh1 mv2">
              <span className={`bg-${selectColor} dib f7 white fw4 br2 pa1`}>{topicLabel}</span>
            </div>
          </div>
        </Link>
        <div className="w-30 mv1 flex">
          <span><EmojiButton onClick={this.handleToggleVisibility}>+ emoji</EmojiButton></span>
           <div className={this.state.emojiVisibility ? "" : "dn"}>
            <EmojiPicker
              onSubmit={this.onSubmitEmoji}
              style={{ position: 'relative', top: '20px' }}
            />
          </div>
          <EmojiDisplay
            emojis={emojis}
            startAddEmoji={this.props.startAddEmoji}
            id={id} />
         
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmoji: (id, emoji) => dispatch(startAddEmoji(id, emoji))
})

export default connect(undefined, mapDispatchToProps)(PostListItem)



  // moment.updateLocale('en', {
  //   relativeTime: {
  //     future: "in %s",
  //     past: "%s ago",
  //     s: "seconds",
  //     m: "1 minute",
  //     mm: "%d minutes",
  //     h: "1 hour",
  //     hh: "%d hours",
  //     d: "1 day",
  //     dd: "%d days",
  //     M: "1 month",
  //     MM: "%d months",
  //     y: "1 year",
  //     yy: "%d years"
  //   }
  // });

  // moment().subtract(1, 'minute').fromNow(); //=> "1 minute ago"
  // moment().subtract(1, 'hour').fromNow(); //=> "1 hour ago"
  // moment().subtract(1, 'day').fromNow(); //=> "1 day ago"
  // moment().subtract(1, 'month').fromNow(); //=> "1 month ago"
  // moment().subtract(1, 'year').fromNow(); //=> "1 year ago"