const darkModeActive = (state = true, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return !state
    default:
      return state
  }
}

export const changeColorMode = () => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_MODE',
    })
  }
}

export default darkModeActive
