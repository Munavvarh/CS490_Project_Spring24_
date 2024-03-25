import { render, fireEvent, waitFor } from '@redwoodjs/testing/web'

import UserFeedbackForm from './UserFeedbackForm'

// Mocking useAuth hook
jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: { id: 1 }, // Provide a dummy user object with an id property
  }),
}))

describe('UserFeedbackForm', () => {
  it('renders successfully', () => {
    // Arrange
    const { getByLabelText, getByText } = render(<UserFeedbackForm />)

    // Act
    const rateLabel = getByLabelText('Rate 1-5: *')
    const reviewLabel = getByLabelText('Feedback Description:')
    const submitButton = getByText('SUBMIT')

    // Assert
    expect(rateLabel).toBeInTheDocument()
    expect(reviewLabel).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('submits feedback when form is submitted', async () => {
    // Arrange
    const onFeedbackSubmitMock = jest.fn()
    const translationId = 123
    const { getByLabelText, getByText } = render(
      <UserFeedbackForm
        translationId={translationId}
        onFeedbackSubmit={onFeedbackSubmitMock}
      />
    )

    // Act
    const rateInput = getByLabelText('Rate 1-5: *')
    const reviewInput = getByLabelText('Feedback Description:')
    const submitButton = getByText('SUBMIT')

    fireEvent.change(rateInput, { target: { value: '5' } })
    fireEvent.change(reviewInput, { target: { value: 'Great translation!' } })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(onFeedbackSubmitMock).toHaveBeenCalledTimes(1)
    })
  })
})
