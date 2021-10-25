import {startLoading} from './isLoadingReducer'

const year = (state = 2020, action) => {
  switch (action.type) {
    case 'SET_YEAR':
      return action.year
    default:
      return state
  }
}

export const setYear = year => {
  return dispatch => {
    dispatch(startLoading())
    dispatch({
      type: 'SET_YEAR',
      year: year,
    })
  }
}

export default year
