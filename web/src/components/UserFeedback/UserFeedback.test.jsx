import { render, screen } from '@redwoodjs/testing'

import UserFeedback from './UserFeedback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserFeedback', () => {
  it('renders successfully', () => {
    const feedback = {
      score: 5,
      review:
        'My code translated literally perfectly I am in love with this website <3',
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
    render(<UserFeedback feedback={feedback} />)

    expect(screen.getByText(feedback.score)).toBeInTheDocument()
    expect(screen.getByText(feedback.review)).toBeInTheDocument()
    const dateExpect = screen.getByText('11 June 2002 12:34:56 UTC')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', feedback.createdAt)
  })
})
