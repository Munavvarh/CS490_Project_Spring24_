import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({
      email: data.email,
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      if (
        response.error.includes(
          'Unique constraint failed on the constraint: `User_email_key`'
        )
      ) {
        response.error = 'That email is already connected to an account.'
      } else if (
        response.error.includes(
          'Unique constraint failed on the constraint: `User_name_key`'
        )
      ) {
        response.error = 'That username is already connected to an account.'
      }
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <MainLayout>
      <Metadata title="Signup" />

      <main className="rw-main mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <img
          src="/logo-bg.png"
          alt="Syntax Switch Logo"
          className="logo-image mr-2 h-8 w-8"
        />
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container shadow dark:border w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 sm:p-8 md:space-y-6">
            <div className="rw-segment">
              <header className="rw-segment-header">
                <h2 className="rw-heading rw-heading-secondary mb-6 text-xl font-bold leading-tight tracking-tight md:text-2xl">
                  Create your account!
                </h2>
              </header>

              <div className="rw-segment-main">
                <div className="rw-form-wrapper">
                  <Form
                    onSubmit={onSubmit}
                    className="rw-form-wrapper space-y-4 md:space-y-6"
                  >
                    <Label
                      name="username"
                      className="rw-label mb-2 block text-sm font-medium text-gray-900"
                      errorClassName="rw-label rw-label-error"
                    >
                      Username
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input bg-gray-50 border rounded focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full border-gray-300 text-gray-900 sm:text-sm"
                      errorClassName="rw-input rw-input-error"
                      placeholder="BMT"
                      ref={usernameRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Username is required',
                        },
                      }}
                    />

                    <Label
                      name="email"
                      className="rw-label mb-2 block text-sm font-medium text-gray-900"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="email"
                      className="rw-input bg-gray-50 border rounded focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full border-gray-300 text-gray-900 sm:text-sm"
                      errorClassName="rw-input rw-input-error"
                      placeholder="name@example.com"
                      validation={{
                        required: {
                          value: true,
                          message: 'Enter a valid email',
                        },
                      }}
                    />

                    <FieldError name="email" className="rw-field-error" />

                    <Label
                      name="password"
                      className="rw-label mb-2 block text-sm font-medium text-gray-900"
                      errorClassName="rw-label rw-label-error"
                    >
                      Password
                    </Label>
                    <PasswordField
                      name="password"
                      className="rw-input bg-gray-50 border rounded focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full border-gray-300 text-gray-900 sm:text-sm"
                      errorClassName="rw-input rw-input-error"
                      placeholder="**********"
                      autoComplete="current-password"
                      validation={{
                        required: {
                          value: true,
                          message: 'Password is required',
                        },
                      }}
                    />

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          aria-describedby="terms"
                          className="border rounded focus:ring-3 focus:ring-primary-300 h-4 w-4 border-gray-300"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="text-grey-500 font-light"
                        >
                          I accept the{' '}
                          <a
                            className="font-medium text-blue-500 hover:underline"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    <div className="rw-button-group">
                      <Submit className="rw-button rw-button-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 py-2.5 w-full rounded-sm bg-blue-500 px-5 text-center text-sm font-medium text-white">
                        Create an account
                      </Submit>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="rw-login-link">
              <span className="text-md font-light text-gray-500">
                Already have an account?
              </span>{' '}
              <Link
                to={routes.login()}
                className="rw-link font-medium text-blue-500 hover:underline"
              >
                Log in!
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default SignupPage
