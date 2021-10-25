import React from 'react'
import * as d3 from 'd3'
import { Table, Header } from 'semantic-ui-react'

const CountryDataTable = ({ country, tradeData, flow }) => {
  if (tradeData.length === 0) {
    return <div>No data available</div>
  }

  return (
    <div className="country-data__table">
      <Header as='h3' style={{ margin: 0 }}>
        {flow === 'exports'
          ? `Main exports from Finland to ${country.name}`
          : `Main imports from ${country.name} to Finland`}
      </Header>
      <Table inverted basic='very' compact celled selectable singleLine className='table-compact'>
        <Table.Body>
          {tradeData.map(product => (
            <Table.Row key={product.group}>
              <Table.Cell>{product.group}</Table.Cell>
              <Table.Cell>{d3.format(',')(product.value)} €</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CountryDataTable
