import React from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import Container from './Container'
import selectPosts from '../selectors/posts'

const PostList = (props) => (
  <Container>
    <div>
      {props.posts.filter((post) => {
        return post.type === "post" && !post.isRemoved
      }).map((post) => {
        return <PostListItem key={post.id} {...post} />
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