import { render, screen, waitFor } from '@redwoodjs/testing'

import { standard } from 'src/components/UserFeedbackListCell/UserFeedbackListCell.mock'

import UserFeedbackOutputPage from './UserFeedbackOutputPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

it('renders feedbacks on the output page', async () => {
  const userFeedback = standard().feedbacks[0]
  expect(() => {
    render(<UserFeedbackOutputPage />)
  }).not.toThrow()

  await waitFor(() =>
    expect(screen.getAllByText(userFeedback.score)[0]).toBeInTheDocument()
  )
})
