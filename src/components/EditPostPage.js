import React from 'react'
import { connect } from 'react-redux';
import PostForm from './PostForm'
import { ContainerForm } from './Container'
import { startEditPost, startRemovePost } from '../actions/posts'
import Button from './Button'

export class EditPostPage extends React.Component {
  onSubmit = (replyTo, updates) => {
    this.props.startEditPost(this.props.post.uid, this.props.post.id, updates)
    console.log(updates)
    this.props.history.push(`/posts/${this.props.post.id}`)
  }
  onRemove = () => {
    this.props.startRemovePost(this.props.post.id)
    console.log(this.props.post.id)
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <ContainerForm>
        <h3 className="f3 pv2 tc">Edit Your Post</h3>
        <PostForm onSubmit={this.onSubmit} post={this.props.post}/>
        <div className="mv2">
          <Button className="bg-light-silver" onClick={this.onRemove}>Remove</Button>
        </div>
      </ContainerForm>
    )
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.find((post) => post.id === props.match.params.id)

});

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (uid, id, post) => dispatch(startEditPost(uid, id, post)),
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)