import React from 'react'
import { Link } from 'react-router-dom'
import TopicSelect from './TopicSelect'
import Button from './Button'
import Container from './Container'


export default class PostFilters extends React.Component {
  render() {
    return (
      <Container>
        <div className="flex justify-between-ns flex-wrap pv2-ns pv0 bb b--black-20">
          <div className="w-100 w-50-m w-25-l pv2">
            <TopicSelect />
          </div>
          <div className="w-100 w-50-m w-50-l pv2">
            <div className="flex justify-center justify-end-m">
              <div className="ba b--black-20 ph3 pv2 mh1 f5 pointer hover-bg-light-gray">New</div>
              <div className="ba b--black-20 ph3 pv2 mh1 f5 pointer hover-bg-light-gray">Top</div>
              <div className="ba b--black-20 ph3 pv2 mh1 f5 pointer hover-bg-light-gray">My Feed</div>
            </div>
          </div>
          <div className="w-100 w-50-m w-25-l pv2">
            <Link to="/posts/new"><Button>Post Something</Button></Link>
          </div>
        </div>
      </Container >
    )
  }
}

