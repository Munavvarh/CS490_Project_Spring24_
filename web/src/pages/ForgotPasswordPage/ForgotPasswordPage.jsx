import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <MainLayout>
      <Metadata title="Forgot Password" />

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
                <h2 className="rw-heading rw-heading-secondary rw-heading rw-heading-secondary mb-6 text-xl font-bold leading-tight tracking-tight md:text-2xl">
                  Forgot Password
                </h2>
              </header>

              <div className="rw-segment-main">
                <div className="rw-form-wrapper">
                  <Form
                    onSubmit={onSubmit}
                    className="rw-form-wrapper space-y-4 md:space-y-6"
                  >
                    <div className="text-left">
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
                        ref={usernameRef}
                        validation={{
                          required: {
                            value: true,
                            message: 'Username is required',
                          },
                        }}
                      />

                      <FieldError name="username" className="rw-field-error" />
                    </div>

                    <div className="rw-button-group">
                      <Submit className="rw-button rw-button-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 py-2.5 w-full rounded-sm bg-blue-500 px-5 text-center text-sm font-medium text-white">
                        Submit
                      </Submit>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default ForgotPasswordPage
