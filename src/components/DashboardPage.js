import React from 'react';
import PostFilters from './PostFilters'
import PostList from './PostList'
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase'


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.posts)
    return (
      <div>
        <PostFilters />
        <PostList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  authUser: state.authUser,
  posts: state.posts,
})



export default connect(mapStateToProps)(DashboardPage)
