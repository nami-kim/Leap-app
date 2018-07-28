import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TopicSelect from './TopicSelect'
import Button from './Button'
import Container from './Container'
import { sortByNew, sortByTop, filterByMyFeed, filterByTopic } from '../actions/filters'

export class PostFilters extends React.Component {
 
  onNewBtn = () => {
    this.props.sortByNew()
  }
  onTopBtn = () => {
    this.props.sortByTop()
  }
  onMyFeedBtn = () => {
    this.props.filterByMyFeed(this.props.authUser.uid)
  }
 
  render() {
    return (
      <Container>
        <div className="flex justify-between-ns flex-wrap pv2-ns pv0 bb b--black-20">
          <div className="w-100 w-50-m w-25-l pv2">
            <TopicSelect />
          </div>
          <div className="w-100 w-50-m w-50-l pv2">
            <div className="flex justify-center justify-end-m">
              <button className="ba b--black-20 ph3 pv2 mh1 f5 btn" onClick={this.onNewBtn}>New</button>
              <button className="ba b--black-20 ph3 pv2 mh1 f5 pointer hover-bg-light-gray" onClick={this.onTopBtn}>Top</button>
              <button className="ba b--black-20 ph3 pv2 mh1 f5 pointer hover-bg-light-gray" onClick={this.onMyFeedBtn}>My Feed</button>
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
  authUser: state.authUser
})

const mapDispatchToProps = (dispatch) => ({
  sortByNew: () => dispatch(sortByNew()),
  sortByTop: () => dispatch(sortByTop()),
  filterByTopic: (topic) => dispatch(filterByTopic(topic)),
  filterByMyFeed: (uid) => dispatch(filterByMyFeed(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFilters);
