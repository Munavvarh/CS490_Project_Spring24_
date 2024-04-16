import React from 'react'

import { render, screen } from '@redwoodjs/testing'

import LoginPage from './LoginPage'

test('renders login page correctly', () => {
  render(<LoginPage />)

  // Check if the main heading is rendered
  expect(screen.getByText(/Sign in to your account!/i)).toBeInTheDocument()

  // Check if the username and password fields are present
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()

  // Check if the login button is rendered
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()

  // Check if the "Forgot Password?" link is present
  expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument()

  // Check if the "Sign up!" link is present
  expect(screen.getByText(/Sign up!/i)).toBeInTheDocument()
})
