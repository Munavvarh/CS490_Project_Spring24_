// web/src/components/ProfileEditPage/ProfileEditPage.test.js

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import { navigate } from '@redwoodjs/router'
import ProfileEditPage, {
  GET_USER_NAME,
  DELETE_USER,
  UPDATE_USER_PROFILE,
} from './ProfileEditPage'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

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
      <MockedProvider>
        <MemoryRouter>
          <GraphQLHooksProvider
            useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
            useQuery={jest.fn().mockReturnValue({ data: {} })}
            useSubscription={jest.fn().mockReturnValue({ data: {} })}
          >
            <ProfileEditPage />
          </GraphQLHooksProvider>
        </MemoryRouter>
      </MockedProvider>
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
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <GraphQLHooksProvider
            useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
            useQuery={jest.fn().mockReturnValue({ data: {} })}
            useSubscription={jest.fn().mockReturnValue({ data: {} })}
          >
            <ProfileEditPage />
          </GraphQLHooksProvider>
        </MemoryRouter>
      </MockedProvider>
    )

    await waitFor(() =>
      expect(screen.getByLabelText('username')).toBeInTheDocument()
    )

    fireEvent.change(screen.getByLabelText('username'), {
      target: { value: updatedName },
    })
    fireEvent.change(screen.getByLabelText('email'), {
      target: { value: updatedEmail },
    })

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/home'))
  })
})
