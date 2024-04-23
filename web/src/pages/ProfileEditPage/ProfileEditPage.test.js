// web/src/components/ProfileEditPage/ProfileEditPage.test.js

import React from 'react'

import { MemoryRouter } from 'react-router-dom'

import { navigate } from '@redwoodjs/router'
import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing'
import { MockProviders } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import ProfileEditPage, {
  GET_USER_NAME,
  DELETE_USER,
  UPDATE_USER_PROFILE,
} from './ProfileEditPage'

jest.mock('src/auth')

describe('ProfileEditPage', () => {
  const currentUser = { id: 1, name: 'John Doe', email: 'john@example.com' }

  beforeEach(() => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      currentUser,
      logOut: jest.fn(),
    })
  })

  it('renders the profile edit page', async () => {
    render(
      <MockProviders>
        <MemoryRouter>
          <GraphQLHooksProvider
            useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
            useQuery={jest.fn().mockReturnValue({ data: {} })}
            useSubscription={jest.fn().mockReturnValue({ data: {} })}
          >
            <ProfileEditPage />
          </GraphQLHooksProvider>
        </MemoryRouter>
      </MockProviders>
    )

    // Assert that the profile edit page renders without crashing
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    expect(screen.getByText('Signed in as:')).toBeInTheDocument()
    expect(screen.getByText('Delete Account')).toBeInTheDocument()
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  it('updates user profile', async () => {
    const updatedName = 'Updated User'
    const updatedEmail = 'updated@example.com'

    const mocks = [
      {
        request: {
          query: UPDATE_USER_PROFILE,
          variables: {
            id: 1,
            input: {
              name: updatedName,
              email: updatedEmail,
            },
          },
        },
        result: {
          data: {
            updateUser: {
              id: 1,
              name: updatedName,
              email: updatedEmail,
            },
          },
        },
      },
    ]

    render(
      <MockProviders mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <GraphQLHooksProvider
            useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
            useQuery={jest.fn().mockReturnValue({ data: {} })}
            useSubscription={jest.fn().mockReturnValue({ data: {} })}
          >
            <ProfileEditPage />
          </GraphQLHooksProvider>
        </MemoryRouter>
      </MockProviders>
    )

    await waitFor(() =>
      expect(screen.getByLabelText('Username')).toBeInTheDocument()
    )

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: updatedName },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: updatedEmail },
    })

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/home'))
  })
})
