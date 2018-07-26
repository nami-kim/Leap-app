import React from 'react'
import { connect } from 'react-redux';
import PostForm from './PostForm'
import { ContainerForm } from './Container'
import { startAddPost } from '../actions/posts'

export class AddPostPage extends React.Component {
  onSubmit = (replyTo, post) => {
    this.props.startAddPost(replyTo, post)
      .then(() => this.props.history.push('/dashboard'))
  }
  render() {
    return (
      <ContainerForm>
        <h3 className="pv2 tc f3">Post What's on Your Mind</h3>
        <PostForm onSubmit={this.onSubmit} />
      </ContainerForm>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddPost: (replyTo, post) => dispatch(startAddPost(replyTo, post))
})

export default connect(undefined, mapDispatchToProps)(AddPostPage)