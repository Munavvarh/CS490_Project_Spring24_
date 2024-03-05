import { render } from '@redwoodjs/testing/web'

import UserFeedbackInputPage from './UserFeedbackInputPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserFeedbackInputPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserFeedbackInputPage />)
    }).not.toThrow()
  })
})
