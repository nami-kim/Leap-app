
import React, { Component, Fragment } from 'react'
import Select from 'react-select'

export const options = [
  { value: 'ai', label: 'AI', color: 'light-red'},
  { value: 'askLeapAnything', label: 'Ask Leap Anything', color: 'light-red'},
  { value: 'asks', label: 'Asks', color: 'light-purple'},
  { value: 'blockchain', label: 'Blockchain', color: 'gold'},
  { value: 'companyBuilding', label: 'Company Building', color: 'dark-green' },
  { value: 'events', label: 'Events', color: 'dark-blue'},
  { value: 'familiesAndRelationship', label: 'Families & Relationship', color: 'orange' },
  { value: 'jobSearching', label: 'Job Serching', color: 'blue' }
]



const TopicSelect = ({...rest}) => (
  <Select {...rest} options={options} isClearable={true} isSearchable={true} placeholder="Topic"/>
)

export default TopicSelect