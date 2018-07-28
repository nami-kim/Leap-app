// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})
// SORT_BY_TOPIC
export const filterByTopic = (topic) => ({
  type: 'FILTER_BY_TOPIC',
  topic
});

// SORT_BY_NEW
export const sortByNew = () => ({
  type: 'SORT_BY_NEW'
})
// SORT_BY_TOP
export const sortByTop= () => ({
  type: 'SORT_BY_TOP'
})
// SORY_BY_MY_FEED
export const filterByMyFeed= (uid) => ({
  type: 'FILTER_BY_MY_FEED',
  uid
})


