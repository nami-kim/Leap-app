import React from 'react';

const Test = () => (
  <div>
    <div className="row">
      <div className="col-xs-12 col-md-4">
        <div className="ba ph3 pv2">A</div>
      </div>
      <div className="col-xs-12 col-md-4">
        <div className="flex justify-center">
          <div className="ba ph3 pv2 mh1">New</div>
          <div className="ba ph3 pv2 mh1">Top</div>
          <div className="ba ph3 pv2 mh1">My Feed</div>
        </div>
      </div>
      <div className="col-xs-12 col-md-4">
        <div className="flex justify-end">
          <div className="ba ph3 pv2">C</div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-9">First</div>
      <div className="col-xs-12 col-md-3">SEcond</div>
    </div>
  </div>
);

export default Test;
