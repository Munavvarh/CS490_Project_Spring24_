import { useState } from 'react'

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

const CREATE = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      createdAt
      score
      email
      review
      codeInput
      codeOutput
    }
  }
`

const UserFeedbackForm = () => {
  const [hasPosted, setHasPosted] = useState(false)
  const [createFeedback, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your feedback!')
    },
  })

  const onSubmit = (input) => {
    createFeedback({ variables: { input } })
  }

  return (
    <GraphQLHooksProvider>
      {' '}
      {/* Wrap your component tree with GraphQLHooksProvider */}
      <div className={hasPosted ? 'hidden' : ''}>
        <Form className="max-w-7xl mt-4" onSubmit={onSubmit}>
          <FormError
            error={error}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          />
          <Label name="score" className="mt-4 block text-xl">
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

          <Label name="email" className="mt-4 block text-xl">
            Email: *
          </Label>
          <TextField
            name="email"
            className="border rounded w-44 text-m block p-1 "
            pattern=".+@.+\..+"
            title="Please enter a valid email address"
            validation={{ required: true }}
          />
          <Label name="review" className="mt-4 block text-xl">
            Feedback Description: *
          </Label>
          <TextAreaField
            name="review"
            className="border rounded text-m block h-24 w-full p-1"
            validation={{ required: true }}
          />
          <Label name="codeInput" className="mt-4 block text-xl">
            Code Input:
          </Label>
          <TextAreaField
            name="codeInput"
            className="border rounded text-m block h-20 w-full p-1"
          />
          <Label name="codeOutput" className="mt-4 block text-xl">
            Code Output:
          </Label>
          <TextAreaField
            name="codeOutput"
            className="border rounded text-m block h-20 w-full p-1"
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
