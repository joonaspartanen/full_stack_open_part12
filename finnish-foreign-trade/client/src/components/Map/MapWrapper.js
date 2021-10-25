import React, { useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import FlowButtons from '../FlowButtons/FlowButtons'
import Map from './Map'

const MapWrapper = ({ imports, exports }) => {
  const [flow, setFlow] = useState('exports')

  if (imports === undefined || exports === undefined) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <>
      <FlowButtons flow={flow} setFlow={setFlow} />
      <Map imports={imports} exports={exports} flow={flow} />
    </>
  )
}

export default MapWrapper
