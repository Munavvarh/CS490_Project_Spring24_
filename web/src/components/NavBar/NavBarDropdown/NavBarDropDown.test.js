import { render, fireEvent, screen } from '@testing-library/react'
import { AuthProvider } from 'src/auth'
import NavBarDropDown from './NavBarDropDown'

describe('NavBarDropDown', () => {
  test('renders user name in dropdown button', () => {
    // Define a mock user object
    const user = { name: 'John Doe', email: 'john@example.com' }

    // Render the NavBarDropDown component with the user prop
    render(
      <AuthProvider isAuthenticated={true} currentUser={user}>
        <NavBarDropDown user={user} />
      </AuthProvider>
    )

    // Get the dropdown button element
    const dropdownButton = screen.getByRole('button', { name: /John Doe/i })

    // Expect the dropdown button to contain the user's name
    expect(dropdownButton).toBeInTheDocument()
  })

  test('clicking dropdown button toggles dropdown menu', () => {
    // Define a mock user object
    const user = { name: 'John Doe', email: 'john@example.com' }

    // Render the NavBarDropDown component with the user prop
    render(
      <AuthProvider isAuthenticated={true} currentUser={user}>
        <NavBarDropDown user={user} />
      </AuthProvider>
    )

    // Get the dropdown button element
    const dropdownButton = screen.getByRole('button', { name: /John Doe/i })

    // Click the dropdown button
    fireEvent.click(dropdownButton)

    // Expect the dropdown menu to be toggled
    expect(screen.getByText(/Signed in as:/i)).toBeInTheDocument()

    // Click the dropdown button again to close the menu
    fireEvent.click(dropdownButton)

    // Expect the dropdown menu to be closed
    expect(screen.queryByText(/Signed in as:/i)).toBeNull()
  })

  test('renders user email in dropdown menu', () => {
    const user = { name: 'John Doe', email: 'john@example.com' }
    render(<NavBarDropDown user={user} />)

    const dropdownButton = screen.getByText(user.name)
    fireEvent.click(dropdownButton)

    const userEmail = screen.getByText(user.email)
    expect(userEmail).toBeInTheDocument()
  })
})
