// Import dependencies for testing from @redwoodjs/testing/web
import { render, screen } from '@redwoodjs/testing/web'

// Import the component to test
import ContactOutputPage from './ContactOutputPage'

describe('ContactOutputPage', () => {
  it('renders page content correctly', () => {
    render(<ContactOutputPage />)

    // Check if the page title and main section text are rendered
    expect(screen.getByText('Contact Us Output')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Below is all of the messages that users have submitted/i
      )
    ).toBeInTheDocument()

    // Check if the ContactListCell component is rendered
    expect(screen.getByRole('list')).toBeInTheDocument() // Assuming ContactListCell renders a list
  })

  it('displays "Back to admin navigation" link with correct destination', () => {
    render(<ContactOutputPage />)

    // Check if the "Back to admin navigation" link is rendered with correct destination
    const backButton = screen.getByText('Back to admin navigation')
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/admin-navigate')
  })
})
