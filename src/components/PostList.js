import React from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import Container from './Container'

const PostList = (props) => (
  <Container>
    <div className="">
      {props.posts.map((post) => {
        return <PostListItem key={post.postId} {...post} />
      })}
    </div>
  </Container>
)

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};
export default connect(mapStateToProps)(PostList)