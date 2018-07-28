const defaultFiltersReducer = {
  text: '',
  sortBy: 'new',
  topic: '',
  uid: ''
}

export default (state = defaultFiltersReducer, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'FILTER_BY_TOPIC':
      return {
        ...state,
        topic: action.topic
      }
    case 'SORT_BY_NEW':
      return {
        ...state,
        sortBy: 'new'
      }
    case 'SORT_BY_TOP':
    return {
      ...state,
      sortBy: 'top'
    }
    case 'FILTER_BY_MY_FEED':
      return {
        ...state,
        uid: action.uid
      }
    default:
      return state
  }
}
