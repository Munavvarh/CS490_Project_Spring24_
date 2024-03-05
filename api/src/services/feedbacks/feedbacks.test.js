import { feedbacks, createFeedback } from './feedbacks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('feedbacks', () => {
  scenario('returns all feedbacks', async (scenario) => {
    const result = await feedbacks()

    expect(result.length).toEqual(Object.keys(scenario.feedback).length)
  })
})

scenario('creates a new comment', async (scenario) => {
  const feedback = await createFeedback({
    input: {
      id: 16,
      score: 1,
      review: 'This thing stinks.',
      createdAt: '2009-12-25T21:55:31Z',
      email: 'hater@hater.org',
      codeInput: 'print("Stupid!")',
      codeOutput: 'System.out.println("Bad!")',
    },
  })

  expect(feedback.email).toEqual('hater@hater.org')
  expect(feedback.review).toEqual('This thing stinks.')
  expect(feedback.score).toEqual(1)
  expect(feedback.createdAt).not.toEqual(null)
})
