import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo text', () => {
  const todo = { text: 'This is a test', done: false }

  render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
  const todoText = screen.getByText('This is a test')
  expect(todoText).toBeInTheDocument()
})

test('renders not done status', () => {
  const todo = { text: 'This is a test', done: false }

  render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
  const notDoneText = screen.getByText('This todo is not done')
  expect(notDoneText).toBeInTheDocument()

  const doneText = screen.queryByText('This todo is done')
  expect(doneText).not.toBeInTheDocument()
})

test('renders done status', () => {
  const todo = { text: 'This is a test', done: true }

  render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
  const doneText = screen.queryByText('This todo is done')
  expect(doneText).toBeInTheDocument()

  const notDoneText = screen.queryByText('This todo is not done')
  expect(notDoneText).not.toBeInTheDocument()
})
