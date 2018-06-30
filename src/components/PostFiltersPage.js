import React from 'react'

const PostFiltersPage = () => (
  <div className="row">
    <div className="col-xs-12 col-md-4">
      <select className="w-80 h2 f4 bg-white ba b--sliver gray">
        <option value="placeholder">All tags</option>
      </select>
    </div>
    <div className="col-xs-12 col-md-4">
      <div className="flex justify-center">
        <div className="ba b--black-20 ph3 pv2 mh1 f4 pointer hover-bg-light-gray">New</div>
        <div className="ba b--black-20 ph3 pv2 mh1 f4 pointer hover-bg-light-gray">Top</div>
        <div className="ba b--black-20 ph3 pv2 mh1 f4 pointer hover-bg-light-gray">My Feed</div>
      </div>
    </div>
    <div className="col-xs-12 col-md-4">
      <button className="f4 dim ph4 pv2 white bg-blue">Post Something</button>
    </div>
  </div>
)

export default PostFiltersPage