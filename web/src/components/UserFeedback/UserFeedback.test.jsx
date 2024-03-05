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
      email: 'pjd37@njit.edu',
      codeInput: 'hi',
      codeOutput: 'lol',
    }
    render(<UserFeedback feedback={feedback} />)

    expect(screen.getByText(feedback.score)).toBeInTheDocument()
    expect(screen.getByText(feedback.email)).toBeInTheDocument()
    const dateExpect = screen.getByText('11 June 2002 12:34:56 UTC')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', feedback.createdAt)
  })
})
