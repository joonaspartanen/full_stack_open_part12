import React from 'react'
import { Statistic } from 'semantic-ui-react'
const indicator = require('ordinal/indicator')

const TradePartnerRankDetails = ({ country, tradePartnerRanking }) => {
  const indicatorText = indicator(tradePartnerRanking.rank)

  return (
    <Statistic inverted className="country-data__rank-details">
      <Statistic.Label>Finland's</Statistic.Label>
      <Statistic.Value>
        {tradePartnerRanking.rank}
        <sup>{indicatorText}</sup>
      </Statistic.Value>
      <Statistic.Label>largest trade partner</Statistic.Label>
    </Statistic>
  )
}

export default TradePartnerRankDetails
