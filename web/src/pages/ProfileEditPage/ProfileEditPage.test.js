// web/src/components/ProfileEditPage/ProfileEditPage.test.js

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { navigate } from '@redwoodjs/router'
import ProfileEditPage from './ProfileEditPage'

describe('ProfileEditPage', () => {
  it('renders user profile edit form', async () => {
    // Mock user data
    // const mockUser = {
    //   id: 1,
    //   name: 'Test User',
    //   email: 'test@example.com',
    // }
    // render(
    //   //   <MockedProvider>
    //   <ProfileEditPage />
    //   //   </MockedProvider>
    // )
    // // Ensure that the user's name and email are displayed
    // expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    // expect(screen.getByText(mockUser.email)).toBeInTheDocument()
    // // Ensure that the form inputs are rendered
    // expect(screen.getByLabelText('Username')).toBeInTheDocument()
    // expect(screen.getByLabelText('Email')).toBeInTheDocument()
    // // Ensure that the delete account and save changes buttons are rendered
    // expect(screen.getByText('Delete Account')).toBeInTheDocument()
    // expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  //   it('calls handleDeleteUser and redirects to home page', async () => {
  //     const mockUser = {
  //       id: 1,
  //       name: 'Test User',
  //       email: 'test@example.com',
  //     }

  //     // Mock deleteUserMutation
  //     const deleteUserMutationMock = jest.fn()

  //     // Mock useAuth
  //     jest.mock('src/auth', () => ({
  //       useAuth: () => ({
  //         isAuthenticated: true,
  //         currentUser: mockUser,
  //         logOut: jest.fn(),
  //       }),
  //     }))

  //     render(
  //       <MockedProvider>
  //         <ProfileEditPage />
  //       </MockedProvider>
  //     )

  //     // Click delete account button
  //     fireEvent.click(screen.getByText('Delete Account'))

  //     // Wait for deleteUserMutation to be called
  //     await waitFor(() => expect(deleteUserMutationMock).toHaveBeenCalled())

  //     // Expect logOut and navigate to be called
  //     expect(mockUser.logOut).toHaveBeenCalled()
  //     expect(navigate).toHaveBeenCalledWith('/home')
  //   })
})
