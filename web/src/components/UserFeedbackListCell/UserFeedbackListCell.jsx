import UserFeedback from 'src/components/UserFeedback'

export const QUERY = gql`
  query UserFeedbackListQuery {
    feedbacks {
      id
      createdAt
      score
      translation {
        originalCode
        translatedCode
      }
      translationId
      review
      User {
        email
      }
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="text-center text-gray-500"></div>
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks }) => {
  return (
    <div className="space-y-4">
      {feedbacks &&
        feedbacks.map((feedback) => (
          <UserFeedback key={feedback.id} feedback={feedback} />
        ))}
    </div>
  )
}
