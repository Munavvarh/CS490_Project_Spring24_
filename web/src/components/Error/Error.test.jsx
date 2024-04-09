import { render, screen } from '@redwoodjs/testing'

import Error from './Error'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Error', () => {
  it('renders successfully', () => {
    const error = {
      description: 'this is a test',
      title: 'test',
      createdAt: '2002-06-11T12:34:56Z',
      User: {
        email: 'user1@example.com',
        hashedPassword: 'randomHashedPassword1',
        salt: 'randomSalt1',
      },
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: 'print("hello world")',
      },
    }
    render(<Error error={error} />)

    expect(screen.getByText(error.title)).toBeInTheDocument()
    expect(screen.getByText(error.description)).toBeInTheDocument()
    const dateExpect = screen.getByText('11 June 2002 12:34:56 UTC')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', error.createdAt)
  })
})
