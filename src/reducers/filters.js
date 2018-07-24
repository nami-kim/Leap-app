
const defaultFiltersReducer = {
  text: '',
  sortByTopic: '',
  sortBy: 'new'
}

export default (state = defaultFiltersReducer, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_TOPIC':
      return {
        ...state,
        sortByTopic: action.topic
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
    default:
      return state
  }
}
