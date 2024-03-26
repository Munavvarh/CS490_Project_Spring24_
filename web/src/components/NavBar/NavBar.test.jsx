// web/src/components/NavBar/NavBar.test.js

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './NavBar'
import { AuthProvider } from 'src/auth'

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
    const feedbackLink = screen.getByText(/feedback/i)
    const loginLink = screen.getByText(/login\/signup/i)

    expect(homeLink).toBeInTheDocument()
    expect(translatorLink).toBeInTheDocument()
    expect(documentationLink).toBeInTheDocument()
    expect(feedbackLink).toBeInTheDocument()
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
    const feedbackLink = screen.getByText(/feedback/i)
    const loginLink = screen.getByText(/login\/signup/i)

    expect(homeLink.getAttribute('href')).toBe('/home');
    expect(translatorLink.getAttribute('href')).toBe('/translation-output');
    expect(documentationLink.getAttribute('href')).toBe('/documentation');
    expect(feedbackLink.getAttribute('href')).toBe('/Feedback');
    expect(loginLink.getAttribute('href')).toBe('/login');
  });


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
