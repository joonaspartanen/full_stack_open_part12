const express = require('express')
const app = express()
const cors = require('cors')
const tradeDataRouter = require('./routes/tradeData')
const countryRouter = require('./routes/countries')

app.use(cors())

app.use('/', tradeDataRouter)
app.use('/countries', countryRouter)

app.get('/health', (req, res) => {
  res.send('ok')
})

module.exports = app
