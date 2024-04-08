// web/src/components/NavBar/NavBar.test.js

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AuthProvider } from 'src/auth'

import NavBar from './NavBar'

describe('NavBar Component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
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
        <NavBar />
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

  it('renders logout button when user is authenticated', () => {
    const logOut = jest.fn()

    render(
      <AuthProvider isAuthenticated={true} logOut={logOut}>
        <NavBar />
      </AuthProvider>
    )
  })
  it('renders login prompt when user is not authenticated', () => {
    render(
      <AuthProvider isAuthenticated={false}>
        <NavBar />
      </AuthProvider>
    )

    const loginPrompt = screen.getByText('Login/Signup')
    expect(loginPrompt).toBeInTheDocument()
  })
})
