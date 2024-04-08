import { Toaster } from '@redwoodjs/web/toast'

import Error from 'src/components/Error'

export const QUERY = gql`
  query FindErrorListQuery {
    errors {
      id
      createdAt
      status
      translation {
        id
        originalCode
        translatedCode
        originalLanguage
        translationLanguage
      }
      title
      description
      translationId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ errors }) => {
  return (
    <>
      <Toaster />

      <div className="space-y-4">
        {errors &&
          errors.map((error) => <Error key={error.id} error={error} />)}
      </div>
    </>
  )
}
