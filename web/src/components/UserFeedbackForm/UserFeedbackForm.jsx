import { useState, useEffect } from 'react'

import { gql } from 'graphql-tag' // Import gql from graphql-tag

import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { GraphQLHooksProvider } from '@redwoodjs/web' // Import GraphQLHooksProvider
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CREATE = gql`
  mutation CreateFeedbackMutation(
    $score: Int!
    $translationId: Int!
    $review: String
    $userId: Int!
  ) {
    createFeedback(
      input: {
        score: $score
        translationId: $translationId
        review: $review
        userId: $userId
      }
    ) {
      id
      createdAt
      score
      translationId
      review
      userId
    }
  }
`

export const UserFeedbackForm = ({
  translationId,
  showFeedback,
  onFeedbackSubmit,
}) => {
  const { currentUser } = useAuth()
  const [hasPosted, setHasPosted] = useState(showFeedback)
  const [createFeedback, { loading, error }] = useMutation(CREATE, {
    onCompleted: (data) => {
      setHasPosted(true)
      toast.success('Thank you for your feedback!')
    },
  })

  const onSubmit = (input) => {
    createFeedback({
      variables: {
        score: input.score,
        translationId: translationId,
        review: input.review,
        userId: currentUser.id,
      },
    })
    onFeedbackSubmit()
  }

  useEffect(() => {
    // Update hasPosted when showFeedback changes
    setHasPosted(showFeedback)
  }, [showFeedback])

  return (
    <GraphQLHooksProvider>
      {' '}
      {/* Wrap your component tree with GraphQLHooksProvider */}
      <div className={hasPosted ? 'hidden' : 'mt-4'}>
        <div className="code-main-label">
          Your feedback is very important to us! Please rate your translation
          1-5 and give any feedback you may have.
        </div>
        <Form className="max-w-7xl" onSubmit={onSubmit}>
          <FormError
            error={error}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          />

          <div className="display: flex-direction: row flex">
            <Label name="score" className="mr-2 text-lg">
              Rate 1-5: *
            </Label>
            <TextField
              name="score"
              className="border rounded text-m block w-12 p-1 "
              type="number"
              min={1}
              max={5}
              validation={{ required: true }}
            />
          </div>

          <Label name="review" className="text-lg">
            Feedback Description:
          </Label>
          <TextAreaField
            name="review"
            className="border rounded text-m block h-24 w-full p-1"
          />
          <Submit
            disabled={loading}
            className="rounded mt-4 block bg-blue-500 px-3 py-2 text-xl font-semibold uppercase tracking-wide text-white disabled:opacity-50"
          >
            SUBMIT
          </Submit>
        </Form>
      </div>
    </GraphQLHooksProvider>
  )
}

export default UserFeedbackForm
