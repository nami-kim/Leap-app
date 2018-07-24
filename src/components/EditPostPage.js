import React from 'react'
import { connect } from 'react-redux';
import PostForm from './PostForm'
import { ContainerForm } from './Container'
import { startEditPost, startRemovePost } from '../actions/posts'
import Button from './Button'

export class EditPostPage extends React.Component {
  onSubmit = (post) => {
    this.props.startEditPost(this.props.post.uid, this.props.post.postId, post)
    this.props.history.push('/dashboard')
  }
  onRemove = () => {
    this.props.startRemoveExpense({uid: this.props.post.uid, postId:this.props.post.postId})
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <ContainerForm>
        <h3 className="f3 pv2 tc">Edit Your Post</h3>
        <PostForm onSubmit={this.onSubmit} post={this.props.post}/>
        <div className="mv2">
          <Button className="bg-light-silver">Remove</Button>
        </div>
      </ContainerForm>
    )
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.find((post) => post.postId === props.match.params.postId)

});

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (uid, postId, expense) => dispatch(startEditPost(uid, postId, expense)),
  startRemovePost: ({uid}, {postId}) => dispatch(startRemovePost({uid}, {postId}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)