import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import NavBar from './NavBar'
import { Provider } from 'react-redux'

afterEach(cleanup)

const mockStore = configureStore([])

let component
let store

beforeEach(() => {
  store = mockStore({
    colorMode: {
      darkModeActive: true,
    },
  })
  component = render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  )
})

describe('<NavBar />', () => {
  test('contains right elements', () => {
    expect(component.container).toHaveTextContent('Finnish Foreign Trade Visualized')
    expect(component.container).toHaveTextContent('Trade Map')
    expect(component.container).toHaveTextContent('Trade Balance')
    expect(component.container).toHaveTextContent('By product group')
    expect(component.container).toHaveTextContent('By trade partner')
  })

  test('links point to right destinations', () => {
    let link = component.getByText('Trade Map')
    expect(link.closest('a')).toHaveAttribute('href', '#trade-map')
    link = component.getByText('Trade Balance')
    expect(link.closest('a')).toHaveAttribute('href', '#trade-balance')
    link = component.getByText('By product group')
    expect(link.closest('a')).toHaveAttribute('href', '#imports-by-product')
    link = component.getByText('By trade partner')
    expect(link.closest('a')).toHaveAttribute('href', '#trade-partners')
  })
})
