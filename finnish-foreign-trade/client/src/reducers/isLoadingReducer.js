const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true
    case 'FINISH_LOADING':
      return false
    default:
      return state
  }
}

export const startLoading = () => {
  return dispatch => {
    dispatch({
      type: 'START_LOADING',
    })
  }
}

export const finishLoading = () => {
  return dispatch => {
    dispatch({
      type: 'FINISH_LOADING',
    })
  }
}

export default isLoading