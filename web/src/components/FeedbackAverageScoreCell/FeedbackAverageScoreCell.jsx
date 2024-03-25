export const QUERY = gql`
  query FeedbackAverageScoreQuery {
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
  return (
    <div className="w-fit rounded-lg bg-yellow-200 p-4 text-3xl font-semibold">
      No user feedback yet
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="w-fit rounded-lg bg-red-200 p-4 text-3xl font-semibold">
    Error: {error?.message}
  </div>
)

export const Success = ({ feedbacks }) => {
  var valueAdded = 0
  var count = 0
  for (var i = 0; i < feedbacks.length; i++) {
    count = parseInt(feedbacks[i].score)
    valueAdded += count
  }
  var avg = valueAdded / i

  return (
    <div className="w-fit rounded-lg bg-blue-300 p-4 text-3xl font-semibold">
      {avg}
    </div>
  )
}
