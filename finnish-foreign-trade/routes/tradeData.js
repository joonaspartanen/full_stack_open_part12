const tradeDataRouter = require('express').Router()
const dataService = require('../services/tradeDataService')
const { cache } = require('../utils/middleware')
const HOUR = 3600
const LAST_YEAR = new Date().getFullYear() - 1

tradeDataRouter.get('/imports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const classifiedImports = await dataService.getClassifiedTradeData(year, '1')
  res.json(classifiedImports)
})

tradeDataRouter.get('/exports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const classifiedExports = await dataService.getClassifiedTradeData(year, '2')
  res.json(classifiedExports)
})

tradeDataRouter.get('/tradebalance', cache(HOUR), async (req, res) => {
  const tradeBalanceData = await dataService.getTradeBalanceData()
  res.json(tradeBalanceData)
})

tradeDataRouter.get('/tradepartners/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const tradePartnerRankings = await dataService.getTradePartnerRankings(year)
  res.json(tradePartnerRankings)
})

tradeDataRouter.get('/SITC1', cache(HOUR), async (req, res) => {
  const SITC1Data = await dataService.getSITC1Data()
  res.json(SITC1Data)
})

tradeDataRouter.get('/SITC2/imports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const SITC2Data = await dataService.getSITC2Data(year, '1')
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/exports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const SITC2Data = await dataService.getSITC2Data(year, '2')
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/total/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const SITC2imports = await dataService.getSITC2Data(year, '1')
  const SITC2exports = await dataService.getSITC2Data(year, '2')
  const result = {
    imports: SITC2imports,
    exports: SITC2exports,
  }
  res.json(result)
})

tradeDataRouter.get('/SITC2/imports/:year?/:country', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const country = req.params.country
  const data = await dataService.getSITC2CountryData(country, year, '1')
  res.json(data)
})

tradeDataRouter.get('/SITC2/exports/:year?/:country', cache(HOUR), async (req, res) => {
  const year = req.params.year || LAST_YEAR
  const country = req.params.country
  const data = await dataService.getSITC2CountryData(country, year, '2')
  res.json(data)
})

module.exports = tradeDataRouter
