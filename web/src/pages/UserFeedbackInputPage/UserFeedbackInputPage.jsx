import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import UserFeedbackForm from 'src/components/UserFeedbackForm/'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const UserFeedbackInputPage = () => {
  return (
    <>
      <Metadata
        title="UserFeedbackInput"
        description="UserFeedbackInput page"
      />

      <Toaster />
      <MainLayout>
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="home-section-title mt-4">Leave Feedback</h2>
          <p className="home-section-text">
            We are always looking to improve SyntaxSwitch, so please give us any
            feedback in the form below. Please be specific!
          </p>
          <div className="mb-8 mt-8">
            <UserFeedbackForm />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default UserFeedbackInputPage
