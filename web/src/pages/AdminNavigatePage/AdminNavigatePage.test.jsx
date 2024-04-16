// Import dependencies for testing
import { MemoryRouter } from 'react-router-dom'

import { render, screen } from '@redwoodjs/testing/web'

// Import the component to test
import AdminNavigatePage from './AdminNavigatePage'

describe('AdminNavigatePage', () => {
  it('renders page content correctly', () => {
    render(
      <MemoryRouter>
        <AdminNavigatePage />
      </MemoryRouter>
    )

    // Check if the page title and main section text are rendered
    expect(screen.getByText('Admin Navigation')).toBeInTheDocument()
    expect(
      screen.getByText(/Follow the links below to go to lists of outputs/i)
    ).toBeInTheDocument()
  })

  it('renders navigation links with correct destinations', () => {
    render(
      <MemoryRouter>
        <AdminNavigatePage />
      </MemoryRouter>
    )

    // Check if the navigation links are rendered with correct destinations
    expect(screen.getByText('Messages From Users')).toHaveAttribute(
      'href',
      '/contact-output'
    )
    expect(screen.getByText('User Feedback Log')).toHaveAttribute(
      'href',
      '/Feedback-out'
    )
    expect(screen.getByText('Error Log')).toHaveAttribute(
      'href',
      '/error-output'
    )
  })
})
