import { Metadata } from '@redwoodjs/web'

import FeedbackAverageScoreCell from 'src/components/FeedbackAverageScoreCell'
import UserFeedbackListCell from 'src/components/UserFeedbackListCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const UserFeedbackOutputPage = () => {
  return (
    <>
      <Metadata
        title="UserFeedbackOutput"
        description="UserFeedbackOutput page"
      />

      <MainLayout>
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="home-section-title mt-4">User Feedback Output</h2>
          <p className="home-section-text">
            Below, you can find feedback submitted by users. The current average
            feedback rating is:
          </p>
          <FeedbackAverageScoreCell />
          <div className="mb-4 mt-4">
            <UserFeedbackListCell />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default UserFeedbackOutputPage
