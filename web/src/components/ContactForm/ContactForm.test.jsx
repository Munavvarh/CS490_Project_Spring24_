import React from 'react'

import { render, fireEvent, waitFor } from '@redwoodjs/testing/web'
import { toast } from '@redwoodjs/web/toast'

import { ContactForm } from './ContactForm'

// Mock the useAuth hook to provide a signed-in user
jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: { id: 1 }, // Simulate a signed-in user with an ID
  }),
}))

// Mock the toast function
jest.mock('@redwoodjs/web/toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

describe('ContactForm', () => {
  it('renders successfully', () => {
    // Arrange
    const { getByLabelText, getByText } = render(<ContactForm />)

    // Act
    const subjectInput = getByLabelText('Subject:')
    const messageInput = getByLabelText('Message:')
    const wantResponseCheckbox = getByLabelText(
      'Check this box if you want a response to your message.'
    )
    const submitButton = getByText('SUBMIT')

    // Assert
    expect(subjectInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(wantResponseCheckbox).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
