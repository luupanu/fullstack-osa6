const notificationReducer = (store = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return store
  }
}

// action creators

export const notify = (notification, timeout = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, timeout*1000)
  }
}

export default notificationReducer