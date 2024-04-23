import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-tag'

import { navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useQuery, useMutation } from '@redwoodjs/web'
import { toast, Toaster, useToasterStore } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const GET_USER_NAME = gql`
  query GetUserName($userId: Int!) {
    user(id: $userId) {
      name
      email
    }
  }
`
const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    userByEmail(email: $email) {
      email
    }
  }
`

const CHECK_NAME = gql`
  query checkName($name: String!) {
    userByName(name: $name) {
      name
    }
  }
`

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

const ProfileEditPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [deleteUserMutation] = useMutation(DELETE_USER)
  const [updateUserProfile, { loading, error }] =
    useMutation(UPDATE_USER_PROFILE)
  var { data } = useQuery(GET_USER_NAME, {
    variables: { userId: currentUser?.id },
    skip: !isAuthenticated || !currentUser,
  })

  useEffect(() => {}, [isAuthenticated])
  const user = data?.user || ''
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  /*  data = useQuery(CHECK_EMAIL, {
    variables: { email: email },
  })
  const emailInUse = data && data.userByEmail
  data = useQuery(CHECK_NAME, {
    variables: { name: name },
  })
  const nameInUse = data && data.userByName
 */
  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation({ variables: { id: currentUser?.id } })
      logOut()
      navigate('/home')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleUpdateUser = async () => {
    /* var updateMessage = ''
    if (emailInUse || nameInUse) {
      if (emailInUse && nameInUse) {
        updateMessage = 'Email and Username are already in use.'
      } else if (emailInUse) {
        updateMessage = 'Email is already in use.'
      } else if (nameInUse) {
        updateMessage = 'Email is already in use.'
      }

      toast.error(updateMessage)
      return
    } */
    try {
      await updateUserProfile({
        variables: {
          id: currentUser?.id,
          input: {
            name,
            email,
          },
        },
      })
      navigate('/home')
    } catch (error) {
      toast.error('There was a problem.  Name or email may already be in use.')
      console.error('Error updating user:', error)
    }
  }

  return (
    <>
      <Toaster />

      <MainLayout>
        <Metadata title="Edit Profile" description="Edit Profile Page" />
        <main className="rw-main mx-auto flex min-h-screen w-full flex-col items-center justify-center px-6 py-1 py-8 md:h-screen md:w-2/3 lg:py-0">
          <div className="p-2 md:p-4">
            <div className="rw-main mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
              <img
                src="/logo-bg.png"
                alt="Syntax Switch Logo"
                className="logo-image "
              />
              <div className="rw-scaffold rw-login-container shadow dark:border p-9 mx-auto grid w-full max-w-2xl rounded-lg bg-white">
                <div className="mb-6 flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <div
                    className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-100 object-cover p-1 text-indigo-800 shadow-lg"
                    alt="Bordered avatar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <div>
                      <span className="text-gray-500">Signed in as:</span>
                      <div className="font-bold text-gray-700">{user.name}</div>
                      <div className="font-bold text-gray-700">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="py-3.5 px-7 focus:outline-none border focus:ring-4 focus:ring-indigo-200 rounded-lg border-indigo-200 bg-white text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 "
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
                <h2 className="mt-6 text-2xl font-bold sm:text-xl">
                  Edit Profile
                </h2>
                <hr />
                <div className="mt-8 items-center sm:mt-10">
                  {/* username field */}
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-indigo-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="bg-indigo-50 border focus:ring-indigo-500 p-2.5 block w-full rounded-lg border-indigo-300 text-sm text-indigo-900 focus:border-indigo-500"
                      placeholder={user.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {/* email */}
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-indigo-900"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="text"
                      className="bg-indigo-50 border focus:ring-indigo-500 p-2.5 block w-full rounded-lg border-indigo-300 text-sm text-indigo-900 focus:border-indigo-500"
                      placeholder={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* save & delete button */}
                <div className="mt-7 flex w-full justify-between">
                  <button
                    onClick={handleDeleteUser}
                    className="rounded-lg border-none bg-red-500 px-4 py-2 text-white hover:bg-blue-800 hover:shadow-inner dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete Account
                  </button>
                  <button
                    className="focus:ring-4 focus:outline-none  focus:ring-blue-300 py-2.5 dark:focus:ring-blue-800 w-full rounded-lg bg-blue-500 px-5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 sm:w-auto"
                    onClick={handleUpdateUser}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
export default ProfileEditPage
