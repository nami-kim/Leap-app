import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { options } from './TopicSelect'
import { Container } from './Container'
import ReplyForm from './ReplyForm'
import EmojiPicker from './EmojiPicker'
import { EmojiButton } from './Button'
import EmojiDisplay from './EmojiDisplay'
import ReplyList from './ReplyList'
import { startAddEmoji } from '../actions/posts'

class PostPage extends React.Component {
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
    this.props.startAddEmoji(this.props.post.id, emoji)
    this.setState(() => ({
      emojiVisibility: !this.state.emojiVisibility
    }))
  }
  render() {
    console.log('this.props.post', this.props.post)
    console.log('this.props.posts', this.props.posts)
    const { createdAt , topic, title, website, anonymous, note, id, emojis, uid, replies } = this.props.post
    const name = this.props.users.find((user) => uid === user.uid).name || ''
    const isAuthor = uid === this.props.authUser.uid
    const postCreatedAt = moment(createdAt)
    const selectOption = options.find((option) => {
      return option.value === topic
    })
    const selectColor = selectOption ? selectOption.color : ''
    const topicLabel = selectOption ? selectOption.label : ''
    return (
      <Container>
        <div className="flex pv3">
          <div className="w-10 pr1 pv1">
            Profile Photo
          </div>
          <div className="w-90 pl1 pv1">
            <div className="w-100 lh-title">
              <span className="fw6 f5">{title}</span>
              <span className="fw2 f6 ph2">
                <a
                  className="no-underline dark-blue"
                  href={website}>{website}</a>
              </span>
            </div>
            <div className="w-100 flex gray f6 mv2">
              <span>{anonymous ? 'anonymous' : name}</span>
              <span className="mh1">·</span>
              <span>{replies.length} replies</span>
              <span className="mh1">·</span>
              <span>{postCreatedAt.startOf('hour').fromNow()}</span>
            </div>
            <div className="w-100 mv2 f7">
              <span className={`bg-${selectColor} dib f6 white fw4 br2 pa1`}>{topicLabel}</span>
            </div>
            <div className="w-100 mv2 fw4 near-black lh-copy">
              {note}
            </div>
            <div className="w-100 mv2 flex">
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
            <div className={isAuthor ? "mv3" : "dn"}>
              <Link
                to={`/posts/${id}/edit`}
                className={"no-underline btn black bg-light-gray ba b--black-20 f7 pv2 ph2 tracked mr2"}
              >Edit Your Post
              </Link>
            </div>
            <div className="mv2 flex items-center">
              <ReplyForm 
              post={this.props.post}
              type="replyToPost" 
              history={this.props.history} 
              linkId={this.props.match.params.id}
              name={name}
              />
            </div>
          </div>
        </div>
        <div className="w-100 bl b--black-20">
          <ReplyList post={this.props.post} />
        </div>
        
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    posts: state.posts,
    post: state.posts.find((post) => {
      return post.id === props.match.params.id
    }),
    authUser: state.authUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmoji: (id, emoji) => dispatch(startAddEmoji(id, emoji))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)