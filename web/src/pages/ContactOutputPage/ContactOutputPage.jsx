import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ContactListCell from 'src/components/ContactListCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ContactOutputPage = () => {
  return (
    <>
      <Metadata title="Contact Output" description="Contact Output page" />

      <MainLayout>
        <Link
          to={routes.adminNavigate()}
          className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
        >
          Back to admin navigation
        </Link>
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="home-section-title mt-4">Contact Us Output</h2>
          <p className="home-section-text">
            Below is all of the messages that users have submitted on the
            Contact Us page:
          </p>
          <div className="mb-4 mt-4">
            <ContactListCell />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default ContactOutputPage
