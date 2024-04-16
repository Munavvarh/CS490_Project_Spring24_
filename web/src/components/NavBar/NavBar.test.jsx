import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { GraphQLHooksProvider } from '@redwoodjs/web'

import { AuthProvider } from 'src/auth'

import NavBar from './NavBar'
import NavBarDropDown from './NavBarDropdown/NavBarDropDown'

describe('NavBar Component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
          useSubscription={jest.fn().mockReturnValue({ data: {} })}
        >
          <NavBar />
        </GraphQLHooksProvider>
      </MemoryRouter>
    )
    const homeLink = screen.getByText(/home/i)
    const translatorLink = screen.getByText(/translator tool/i)
    const documentationLink = screen.getByText(/documentation/i)
    const contactLink = screen.getByText(/contact us/i)
    const loginLink = screen.getByText(/login\/signup/i)

    expect(homeLink).toBeInTheDocument()
    expect(translatorLink).toBeInTheDocument()
    expect(documentationLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
    expect(loginLink).toBeInTheDocument()
  })

  test('navigates to correct routes', () => {
    render(
      <MemoryRouter>
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
          useSubscription={jest.fn().mockReturnValue({ data: {} })}
        >
          <NavBar />
        </GraphQLHooksProvider>
      </MemoryRouter>
    )

    const homeLink = screen.getByText(/home/i)
    const translatorLink = screen.getByText(/translator tool/i)
    const documentationLink = screen.getByText(/documentation/i)
    const contactLink = screen.getByText(/contact us/i)
    const loginLink = screen.getByText(/login\/signup/i)

    expect(homeLink).toHaveAttribute('href', '/home')
    expect(translatorLink).toHaveAttribute('href', '/translation-output')
    expect(documentationLink).toHaveAttribute('href', '/documentation')
    expect(contactLink).toHaveAttribute('href', '/contact-us')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('renders login prompt when user is not authenticated', () => {
    render(
      <AuthProvider isAuthenticated={false}>
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
          useSubscription={jest.fn().mockReturnValue({ data: {} })}
        >
          <NavBar />
        </GraphQLHooksProvider>
      </AuthProvider>
    )
    const loginPrompt = screen.getByText('Login/Signup')
    expect(loginPrompt).toBeInTheDocument()
  })
})
