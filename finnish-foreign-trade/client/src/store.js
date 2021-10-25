import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import countryCodes from './reducers/countryReducer'
import tradeData from './reducers/tradeDataReducer'
import year from './reducers/yearReducer'
import darkModeActive from './reducers/colorModeReducer'
import isLoading from './reducers/isLoadingReducer'

const combinedReducer = combineReducers({
  tradeData,
  countryCodes,
  year,
  darkModeActive,
  isLoading,
})

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
