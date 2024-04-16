// Import dependencies for testing from @redwoodjs/testing/web
import { render, screen } from '@redwoodjs/testing/web'

// Import the component to test
import ContactUsPage from './ContactUsPage'

describe('ContactUsPage', () => {
  it('renders the Contact Us page correctly', () => {
    // Render the ContactUsPage component
    render(<ContactUsPage />)

    // Assert that the main section title and text are rendered
    const pageTitle = screen.getByRole('heading', { name: /Contact Us/i })
    expect(pageTitle).toBeInTheDocument()
    expect(
      screen.getByText(/Use this form to contact us with your thoughts/i)
    ).toBeInTheDocument()

    // Assert that the ContactForm component is rendered
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
