import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { options } from './TopicSelect'
import { Container } from './Container'
import ReplyForm from './ReplyForm'
import EmojiPicker from './EmojiPicker'
import { EmojiButton, ReplyButton } from './Button'
import EmojiDisplay from './EmojiDisplay'
import ReplyList from './ReplyList'

class PostPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emojiVisibility: false
    }
  }

  render() {
    console.log(this.props.replies)
    console.log(this.props.match.params.postId)
    const { createdAt, topic, title, website, anonymous, name, note, postId, emojis, uid } = this.props.post
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
              <span>0 replies</span>
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
                postId={postId} />
              <div className={!this.state.emojiVisibility && "dn"}>
                <EmojiPicker
                  onSubmit={this.onSubmitEmoji}
                />
              </div>
            </div>
            <div className={isAuthor ? "mv3" : "dn"}>
              <Link
                to={`/posts/${postId}/edit`}
                className={"no-underline btn black bg-light-gray ba b--black-20 f7 pv2 ph2 tracked mr2"}
              >Edit Your Post
              </Link>
            </div>
            <div className="mv2 flex items-center">
              <ReplyForm {...this.props.post} />
            </div>
          </div>
        </div>
        <div className="w-100 bl b--black-20">
          <ReplyList post={this.props.post} replies={this.props.replies} />
        </div>
        <div className="mv2 flex items-center">
          <ReplyForm {...this.props.post} />
        </div>
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find((post) => {
      return post.postId === props.match.params.postId
    }),
    authUser: state.authUser,
    replies: state.replies.filter((reply) => {
      return reply.postId === props.match.params.postId
    })

  };

};
export default connect(mapStateToProps)(PostPage)