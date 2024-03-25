import { render, screen } from '@redwoodjs/testing/web'

import { standard } from 'src/components/UserFeedbackListCell/UserFeedbackListCell.mock'

import { Loading, Empty, Failure, Success } from './FeedbackAverageScoreCell'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('FeedbackAverageScoreCell', () => {
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
    expect(screen.getByText('No user feedback yet')).toBeInTheDocument()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
    expect(screen.getByText('Error: Oh no')).toBeInTheDocument()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    const feedbacks = standard().feedbacks
    render(<Success feedbacks={feedbacks} />)

    var valueAdded = 0
    var count = 0
    for (var i = 0; i < feedbacks.length; i++) {
      count = parseInt(feedbacks[i].score)
      valueAdded += count
    }
    var avg = valueAdded / i

    expect(screen.getByText(avg)).toBeInTheDocument()
  })
})

// When you're ready to test the actual output of your component render
// you could test that, for example, certain text is present:
//
// 1. import { screen } from '@redwoodjs/testing/web'
// 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()
/*
  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success feedbacks={standard().feedbacks} />)
    }).not.toThrow()
  })
*/
