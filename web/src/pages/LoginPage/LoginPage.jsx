import { useRef, useState, useEffect } from 'react'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [twoFactorRequired, setTwoFactorRequired] = useState(false)
  const [loginData, setLoginData] = useState({})

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    if (!twoFactorRequired) {
      const response = await logIn({
        username: data.username,
        password: data.password,
      })

      if (response.message && response.message.includes('2FA code sent')) {
        toast(response.message)
        setTwoFactorRequired(true)
        setLoginData(data)  // Save login data for the second attempt
      } else if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Welcome back!')
        navigate(routes.home())
      }
    } else {
      // This is the second submission for the 2FA code
      const response = await logIn({
        ...loginData,
        twoFactorCode: data.twoFactorCode,
      })

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('2FA verification successful, welcome back!')
        navigate(routes.home())
      }
    }
  }

  return (
    <>
      <MainLayout>
        <Metadata title="Login" />
        <main className="rw-main mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <img
            src="/logo.png"
            alt="Syntax Switch Logo"
            className="logo-image mr-2 h-8 w-8"
          />
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="rw-scaffold rw-login-container shadow dark:border w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 sm:p-8 md:space-y-6">
              <div className="rw-segment">
                <header className="rw-segment-header">
                  <h2 className="rw-heading rw-heading-secondary mb-6 text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Sign in to your account!
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

                        disabled={twoFactorRequired}
                      />
                      <FieldError name="username" className="rw-field-error" />

                      <Label
                        name="password"
                        className="rw-label mb-2 block text-sm font-medium text-gray-900 "
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

                      {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby='remember' type="text" />
                        </div>
                      </div>
                    </div> */}

                      <div className="rw-forgot-link">
                        <Link
                          to={routes.forgotPassword()}
                          className="rw-forgot-link text-primary-600 text-sm font-medium text-blue-500 hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <FieldError name="password" className="rw-field-error" />

                      <div className="rw-button-group">
                        <Submit className="rw-button rw-button-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 py-2.5 w-full rounded-sm bg-blue-500 px-5 text-center text-sm font-medium text-white">
                          Login
                        </Submit>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="rw-login-link">
                <span className="text-md font-light text-gray-500">
                  Don&apos;t have an account?
                </span>{' '}
                <Link
                  to={routes.signup()}
                  className="rw-link font-medium text-blue-500 hover:underline"
                >
                  Sign up!
                </Link>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  )
}

export default LoginPage
