import getCountryCodes from '../services/countryService'
import { startLoading } from './isLoadingReducer'

const countryCodes = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COUNTRYCODES':
      return action.payload
    default:
      return state
  }
}

export const initializeCountryCodes = () => {
  return async dispatch => {
    dispatch(startLoading())
    const countryCodes = await getCountryCodes()
    dispatch({
      type: 'INIT_COUNTRYCODES',
      payload: countryCodes,
    })
  }
}

export default countryCodes
