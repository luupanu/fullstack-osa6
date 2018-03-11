const filterReducer = (store = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return store
  }
}

// action creators

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer