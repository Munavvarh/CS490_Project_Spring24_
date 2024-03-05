import UserFeedbackForm from './UserFeedbackForm'

export const generated = () => {
  mockGraphQLMutation('CreateFeedbackMutation', (variables, { ctx }) => {
    const id = Math.floor(Math.random() * 1000)
    ctx.delay(1000)

    return {
      createFeedback: {
        id,
        email: variables.input.email,
        review: variables.input.review,
        codeInput: variables.input.codeInput,
        codeOutput: variables.input.codeOutput,
        score: variables.input.scoreselect,
        createdAt: new Date().toISOString(),
      },
    }
  })

  return <UserFeedbackForm />
}

export default { title: 'Components/UserFeedbackForm' }
