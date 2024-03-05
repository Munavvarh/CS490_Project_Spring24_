import { render } from '@redwoodjs/testing/web'

import UserFeedbackForm from './UserFeedbackForm'

describe('UserFeedbackForm', () => {
  it('renders successfully', () => {
    // Arrange
    const { getByLabelText, getByText } = render(<UserFeedbackForm />)

    // Act
    const scoreInput = getByLabelText('Rate 1-5: *')
    const emailInput = getByLabelText('Email: *')
    const reviewInput = getByLabelText('Feedback Description: *')
    const submitButton = getByText('SUBMIT')

    // Assert
    expect(scoreInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(reviewInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
