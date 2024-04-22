import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import ErrorListCell from 'src/components/ErrorListCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ErrorOutputPage = () => {
  return (
    <>
      <Metadata title="Error Output" description="ErrorOutput page" />
      <Toaster />
      <MainLayout>
        <Link
          to={routes.adminNavigate()}
          className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
        >
          Back to admin navigation
        </Link>
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="home-section-title mt-4">Error Output</h2>
          <p className="home-section-text">
            Below is a log of the errors that have occured during translations:
          </p>
          <div className="mb-4 mt-2">
            <ErrorListCell />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default ErrorOutputPage
