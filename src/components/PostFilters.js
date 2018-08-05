import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TopicSelect from './TopicSelect'
import Button from './Button'
import Container from './Container'
import { sortByNew, sortByTop, filterByMyFeed, filterByTopic } from '../actions/filters'
import selectPosts from '../selectors/posts'

export class PostFilters extends React.Component {
  state = {
    newBtn: false,
    topBtn: false,
    myFeedBtn: false,
    topic: '',
  }
  onNewBtn = () => {
    this.setState(() => ({
      newBtn: !this.state.newBtn,
      topBtn: false,
      myFeedBtn: false
    }))
    this.props.sortByNew()
  }
  onTopBtn = () => {
    this.setState(() => ({
      newBtn: false,
      topBtn: !this.state.topBtn,
      myFeedBtn: false
    }))
    this.props.sortByTop()
  }
  onMyFeedBtn = () => {
    const uid = this.props.authUser.uid
    this.setState(() => ({
      newBtn: false,
      topBtn: false,
      myFeedBtn: !this.state.myFeedBtn
    }), () => {
      if (this.state.myFeedBtn) {
        this.props.filterByMyFeed(uid)
      } else {
        this.props.filterByMyFeed('')
      }
    })
  }
  onTopicSelect = (selectedOption) => {
    console.log(selectedOption)
    if (selectedOption !== null) {
      this.setState(() => ({ topic: selectedOption.value }), () => {
        this.props.filterByTopic(this.state.topic)
      })
    } else if (selectedOption === null) {
      this.setState(() => ({ topic: '' }), () => {
        this.props.filterByTopic('')
      })
    }
  }
  render() {
    console.log(this.props.filters)
    console.log(this.props.posts)
    console.log(this.state)
    return (
      <Container>
        <div className="flex justify-between-ns flex-wrap pv2-ns pv0 bb b--black-20">
          <div className="w-100 w-50-m w-25-l pv2">
            <TopicSelect onChange={this.onTopicSelect} />
          </div>
          <div className="w-100 w-50-m w-50-l pv2">
            <div className="flex justify-center justify-end-m">
              <button className={this.state.newBtn ? "bold bg-light-silver mh1 pv2" : "sortBtn mh1 pv2"} onClick={this.onNewBtn}>New</button>
              <button className={this.state.topBtn ? "bold bg-light-silver mh1 pv2" : "sortBtn mh1 pv2"} onClick={this.onTopBtn}>Top</button>
              <button className={this.state.myFeedBtn ? "bold bg-light-silver mh1 pv2" : "sortBtn mh1 pv2"} onClick={this.onMyFeedBtn}>My Feed</button>
            </div>
          </div>
          <div className="w-100 w-50-m w-25-l pv2">
            <Link to="/posts/new"><Button>Post Something</Button></Link>
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  authUser: state.authUser,
  posts: selectPosts(state.posts, state.filters)
})

const mapDispatchToProps = (dispatch) => ({
  sortByNew: () => dispatch(sortByNew()),
  sortByTop: () => dispatch(sortByTop()),
  filterByTopic: (topic) => dispatch(filterByTopic(topic)),
  filterByMyFeed: (uid) => dispatch(filterByMyFeed(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFilters);
