import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FlowButtons from './FlowButtons'

const setFlowMock = jest.fn()

let component
let exportsButton
let importsButton

beforeEach(() => {
  component = render(<FlowButtons setFlow={setFlowMock} />)
  exportsButton = component.getByText('Exports')
  importsButton = component.getByText('Imports')
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe.skip('<FlowButtons />', () => {
  test('contains right elements', () => {
    expect(exportsButton).toBeDefined()
    expect(importsButton).toBeDefined()
  })

  describe('exports button', () => {
    test('does not call setFlow if exports are already active', () => {
      if (exportsButton.className.includes('active')) {
        fireEvent.click(exportsButton)
        expect(setFlowMock).toBeCalledTimes(0)
      }
    })

    test('calls setFlow once if exports are not active', () => {
      setImportsActive()
      if (!exportsButton.className.includes('active')) {
        fireEvent.click(exportsButton)
        expect(setFlowMock).toBeCalledTimes(1)
      }
    })

    test('is activated when clicked', () => {
      setImportsActive()
      expect(!exportsButton.className.includes('active'))
      fireEvent.click(exportsButton)
      expect(exportsButton.className.includes('active'))
    })
  })

  describe('imports button', () => {
    test('does not call setFlow if imports are already active', () => {
      setImportsActive()
      if (importsButton.className.includes('active')) {
        fireEvent.click(importsButton)
        expect(setFlowMock).toBeCalledTimes(0)
      }
    })

    test('calls setFlow once if imports are not active', () => {
      setExportsActive()
      if (!importsButton.className.includes('active')) {
        fireEvent.click(importsButton)
        expect(setFlowMock).toBeCalledTimes(1)
      }
    })

    test('is activated when clicked', () => {
      setExportsActive()
      expect(!importsButton.className.includes('active'))
      fireEvent.click(importsButton)
      expect(importsButton.className.includes('active'))
    })
  })
})

const setImportsActive = () => {
  fireEvent.click(importsButton)
  jest.clearAllMocks()
}

const setExportsActive = () => {
  fireEvent.click(exportsButton)
  jest.clearAllMocks()
}
