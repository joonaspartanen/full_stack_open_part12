const countryRouter = require('express').Router()
const { fetchCountryCodes } = require('../services/countryService')
const { cache } = require('../utils/middleware')
const HOUR = 3600

countryRouter.get('/', cache(HOUR), async (req, res) => {
  const countries = await fetchCountryCodes()
  res.json(countries)
})

module.exports = countryRouter
