import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollableAnchor from 'react-scrollable-anchor'
import { Container, Loader } from 'semantic-ui-react'
import CountryDataWrapper from './components/CountryData/CountryDataWrapper'
import CountrySearch from './components/CountryData/CountrySearch'
import Footer from './components/Footer/Footer'
import MapWrapper from './components/Map/MapWrapper'
import NavBar from './components/NavBar/NavBar'
import TreeMapWrapper from './components/ProductsTreeMap/TreeMapWrapper'
import D3TradeBalanceChart from './components/TradeBalanceChart/D3TradeBalanceChart'
import { initializeTradeBalanceData, initializeTradeData } from './reducers/tradeDataReducer'
import { initializeCountryCodes } from './reducers/countryReducer'
import './App.scss'

const App = () => {
  const dispatch = useDispatch()

  const [country, setCountry] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const state = useSelector(state => state)
  const tradeData = state.tradeData
  const tradeBalance = tradeData.tradeBalance
  const isLoading = state.isLoading
  const year = state.year

  const handleCountryFilterChange = countryName => {
    setCountryFilter(countryName)
    const country = state.countryCodes.filter(c => c.name === countryName)
    setCountry(country)
  }

  useEffect(() => {
    dispatch(initializeCountryCodes())
    dispatch(initializeTradeBalanceData())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeTradeData(year))
  }, [year, dispatch])

  return (
    <div className={state.darkModeActive ? 'main-container dark-mode' : 'main-container'}>
      <Container fluid>
        <NavBar year={year} darkModeActive={state.darkModeActive} />
        {isLoading && (
          <div style={{ height: '100vh' }}>
            <Loader active />
          </div>
        )}
        {!isLoading && (
          <div>
            <ScrollableAnchor id={'trade-map'}>
              <section
                className={state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'}>
                <MapWrapper
                  imports={tradeData.importsData}
                  exports={tradeData.exportsData}></MapWrapper>
                <a href='#trade-balance' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-balance'}>
              <section
                className={state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'}>
                <D3TradeBalanceChart
                  tradeBalance={tradeBalance}
                  darkModeActive={state.darkModeActive}></D3TradeBalanceChart>
                <a href='#imports-by-product' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'imports-by-product'}>
              <section
                className={state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'}>
                <TreeMapWrapper sitc2Data={tradeData.sitc2Data} year={year} />
                <a href='#trade-partners' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-partners'}>
              <section
                className={state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'}>
                {country.length === 0 && (
                  <CountrySearch
                    countryFilter={countryFilter}
                    handleCountryFilterChange={handleCountryFilterChange}
                    countryCodes={state.countryCodes}
                  />
                )}
                {country.length !== 0 && (
                  <CountryDataWrapper
                    country={country[0]}
                    setCountry={setCountry}
                    setCountryFilter={setCountryFilter}
                    year={year}
                    tradePartnerRankings={tradeData.tradePartnerRankings}
                  />
                )}
              </section>
            </ScrollableAnchor>
          </div>
        )}
        <Footer darkModeActive={state.darkModeActive} />
      </Container>
    </div>
  )
}

export default App
