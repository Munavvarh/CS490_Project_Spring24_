import { render, screen, waitFor } from '@redwoodjs/testing'

import { standard } from 'src/components/UserFeedbackListCell/UserFeedbackListCell.mock'

import UserFeedbackOutputPage from './UserFeedbackOutputPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

it('renders comments when displaying a full blog post', async () => {
  const userFeedback = standard().feedbacks[0]
  expect(() => {
    render(<UserFeedbackOutputPage />)
  }).not.toThrow()

  await waitFor(() =>
    expect(screen.getByText(userFeedback.score)).toBeInTheDocument()
  )
})
