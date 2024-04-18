import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './UserFeedbackListCell'
import { standard } from './UserFeedbackListCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('UserFeedbackListCell', () => {
  it('renders Loading successfully', async () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders nonminimal Success successfully', async () => {
    const feedbacks = standard().feedbacks
    render(<Success feedbacks={feedbacks} minimal={false} />)

    feedbacks.forEach((feedback) => {
      expect(screen.getByText(feedback.User.email)).toBeInTheDocument()
      expect(
        screen.getAllByText(feedback.translation.originalCode)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(feedback.translation.translatedCode)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(feedback.translation.originalLanguage)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(feedback.translation.translationLanguage)[0]
      ).toBeInTheDocument()
      expect(screen.getAllByText(feedback.score)[0]).toBeInTheDocument()
      expect(screen.getAllByText(feedback.review)[0]).toBeInTheDocument()
    })
  })

  it('renders minimal Success successfully', async () => {
    const feedbacks = standard().feedbacks.slice(
      standard().feedbacks.length - 5,
      standard().feedbacks.length
    )
    render(<Success feedbacks={feedbacks} minimal={true} />)

    feedbacks.forEach((feedback) => {
      expect(() => screen.getByText(feedback.User.email)).toThrow()
      expect(() =>
        screen.getByText(feedback.translation.originalCode)
      ).toThrow()
      expect(() =>
        screen.getByText(feedback.translation.translatedCode)
      ).toThrow()
      expect(() =>
        screen.getByText(feedback.translation.originalLanguage)
      ).toThrow()
      expect(() =>
        screen.getByText(feedback.translation.translationLanguage)
      ).toThrow()
      expect(screen.getAllByText(feedback.score)[0]).toBeInTheDocument()
      expect(screen.getAllByText(feedback.review)[0]).toBeInTheDocument()
    })
  })
})
