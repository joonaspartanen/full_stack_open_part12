import React from 'react'
import { Form } from 'semantic-ui-react'

const Controls = ({ flow, setFlow }) => {
  return (
    <div>
      <Form inverted>
        <Form.Group>
          <Form.Radio
            label='Exports'
            name='radioGroup'
            value='exports'
            checked={flow === 'exports'}
            onChange={() => setFlow('exports')}
          />
          <Form.Radio
            label='Imports'
            name='radioGroup'
            value='imports'
            checked={flow === 'imports'}
            onChange={() => setFlow('imports')}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Controls
