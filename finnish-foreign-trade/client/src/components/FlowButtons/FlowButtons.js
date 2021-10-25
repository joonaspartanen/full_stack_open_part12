import React from 'react'
import { Button } from 'semantic-ui-react'

const FlowButtons = ({ flow, setFlow }) => {

  const exportsActive = flow === 'exports'

  return (
    <div style={{ position: 'absolute', bottom: '2em', left: '2em', zIndex: '1' }}>
      <Button.Group>
        <Button
          toggle
          active={exportsActive}
          content='Exports'
          onClick={value => {
            if (!exportsActive) {
              setFlow('exports')
            }
          }}
        />
        <Button
          toggle
          active={!exportsActive}
          content='Imports'
          onClick={value => {
            if (exportsActive) {
              setFlow('imports')
            }
          }}
        />
      </Button.Group>
    </div>
  )
}

export default FlowButtons
