import { useState, useEffect } from 'react'

import { gql } from 'graphql-tag' // Import gql from graphql-tag

import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
  CheckboxField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { GraphQLHooksProvider } from '@redwoodjs/web' // Import GraphQLHooksProvider
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CREATE = gql`
  mutation CreateContactMutation(
    $userId: Int!
    $subject: String!
    $message: String!
    $wantResponse: Boolean!
  ) {
    createContact(
      input: {
        subject: $subject
        message: $message
        wantResponse: $wantResponse
        userId: $userId
      }
    ) {
      id
      createdAt
      userId
      subject
      message
      wantResponse
    }
  }
`

export const ContactForm = () => {
  const { currentUser } = useAuth()
  const [hasPosted, setHasPosted] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [subjectText, setSubjectText] = useState('')
  const [createContact, { loading, error }] = useMutation(CREATE, {
    onCompleted: (data) => {
      setHasPosted(true)
      toast.success('Thank you for your message!')
    },
  })

  const onSubmit = (input) => {
    if (!currentUser) {
      toast.error('Please log in to contact us.')
      return
    }

    if (input.subject == '' || input.message == '') {
      toast.error('Please include both a subject and a message.')
      return
    }

    createContact({
      variables: {
        userId: currentUser.id,
        subject: input.subject,
        message: input.message,
        wantResponse: input.wantResponse,
        sentResponse: false,
      },
    })
    setMessageText('')
    setSubjectText('')
  }

  return (
    <GraphQLHooksProvider>
      {' '}
      {/* Wrap your component tree with GraphQLHooksProvider */}
      <div className="mt-4">
        <Form className="max-w-7xl" onSubmit={onSubmit}>
          <FormError
            error={error}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          />

          <Label name="subject" className="text-lg">
            Subject:
          </Label>
          <TextField
            name="subject"
            className="border rounded text-m mb-2 block h-8 w-full p-1"
            value={subjectText}
            onChange={(e) => setSubjectText(e.target.value)}
          />

          <Label name="message" className="text-lg">
            Message:
          </Label>
          <TextAreaField
            name="message"
            className="border rounded text-m block h-24 w-full p-1"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <CheckboxField name="wantResponse" />
          <Label name="wantResponse" className="text-md ml-2">
            Check this box if you want a response to your message.
          </Label>

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

export default ContactForm
