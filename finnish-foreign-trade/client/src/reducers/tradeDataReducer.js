import dataService from '../services/dataService'
import { startLoading, finishLoading } from './isLoadingReducer'

const tradeData = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_TRADEDATA':
      return {
        ...state,
        exportsData: action.exportsData,
        importsData: action.importsData,
        sitc2Data: action.sitc2Data,
        tradePartnerRankings: action.tradePartnerRankings,
      }
    case 'INIT_TRADE_BALANCE_DATA':
      return {
        ...state,
        tradeBalance: action.tradeBalance,
      }
    default:
      return state
  }
}

export const initializeTradeData = year => {
  return async dispatch => {
    dispatch(startLoading())
    const exportsData = await dataService.getExports(year)
    const importsData = await dataService.getImports(year)
    const sitc2Data = await dataService.getSitc2Data(year, 'total')
    const tradePartnerRankings = await dataService.getTradePartnerRankings(year)
    dispatch({
      type: 'INIT_TRADEDATA',
      exportsData: exportsData,
      importsData: importsData,
      sitc2Data: sitc2Data,
      tradePartnerRankings: tradePartnerRankings,
    })
    dispatch(finishLoading())
  }
}

export const initializeTradeBalanceData = () => {
  return async dispatch => {
    dispatch(startLoading())
    const tradeBalance = await dataService.getTradeBalance()
    dispatch({
      type: 'INIT_TRADE_BALANCE_DATA',
      tradeBalance: tradeBalance,
    })
  }
}

export default tradeData
