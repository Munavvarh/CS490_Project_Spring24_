import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import MainLayout from 'src/layouts/MainLayout/MainLayout'

const AdminNavigatePage = () => {
  return (
    <>
      <Metadata title="Admin Navigate" description="Admin Navigate page" />

      <MainLayout>
        <main className="home-main">
          <h2 className="home-section-title">Admin Navigation</h2>
          <p className="home-section-text">
            Follow the links below to go to lists of outputs from various data
            collected from users around the website.
            <div>
              <Link
                to={routes.contactOutput()}
                className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
              >
                Messages From Users
              </Link>
              <Link
                to={routes.userFeedbackOutput()}
                className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
              >
                User Feedback Log
              </Link>
              <Link
                to={routes.errorOutput()}
                className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
              >
                Error Log
              </Link>
            </div>
          </p>
        </main>
      </MainLayout>
    </>
  )
}

export default AdminNavigatePage
