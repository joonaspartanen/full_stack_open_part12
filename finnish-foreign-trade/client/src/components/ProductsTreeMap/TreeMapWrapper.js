import React, { useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import FlowButtons from '../FlowButtons/FlowButtons'
import ProductsTreeMap from './ProductsTreeMap'

const TreeMapWrapper = ({ sitc2Data, year }) => {
  const [flow, setFlow] = useState('exports')

  if (sitc2Data === undefined) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <>
      <FlowButtons flow={flow} setFlow={setFlow} />
      <ProductsTreeMap sitc2Data={sitc2Data} flow={flow} year={year} />
    </>
  )
}

export default TreeMapWrapper
