import { useState } from 'react'

import { useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as FindErrorListQuery } from 'src/components/ErrorListCell'

const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()} ${parsedDate.getUTCHours()}:${parsedDate.getUTCMinutes()}:${parsedDate.getUTCSeconds()} UTC`
}

const UPDATE_ERROR_STATUS = gql`
  mutation UpdateErrorMutation($id: Int!, $input: UpdateErrorInput!) {
    updateError(id: $id, input: $input) {
      id
    }
  }
`

const Error = ({ error }) => {
  const [status, setStatus] = useState('')
  const [updateError] = useMutation(UPDATE_ERROR_STATUS, {
    refetchQueries: [{ query: FindErrorListQuery }],
  })

  const handleUpdateClick = async () => {
    const { data: errorData } = await updateError({
      variables: {
        id: error.id,
        input: {
          status: status,
        },
      },
    })
    setStatus('')
    toast.success('Status updated')
  }

  return (
    <div className="rounded-lg bg-red-200 p-8">
      <div>
        <header className="flex justify-between">
          <p>
            <b>Error Title:</b> {error.title}
          </p>
          <time className="text-xs text-gray-600" dateTime={error.createdAt}>
            {formattedDate(error.createdAt)}
          </time>
        </header>
        <p>
          <b>Error Description:</b> {error.description}
        </p>
        <p>
          <b>Translation ID:</b> {error.translation.id}
        </p>
        <p>
          <b>Original Language:</b> {error.translation.originalLanguage}
        </p>
        <p>
          <b>Translation Language:</b> {error.translation.translationLanguage}
        </p>

        <table className="w-fit table-fixed border-collapse grid-cols-2 grid-rows-2">
          <thead>
            <tr>
              <th className="border bg-opacity-20 border-black bg-red-900 text-left">
                Code Input:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black">
                <code>{error.translation.originalCode}</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Error Status:</b> {error.status}
        </p>
        <div className="flex">
          <label htmlFor="status" className="block font-bold">
            Update Error Status:
          </label>
          <textarea
            id="status"
            className="ml-2 mr-1 block h-8 w-48 rounded-sm border-gray-300 shadow-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></textarea>
          <button
            onClick={handleUpdateClick}
            className="border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 inline-flex h-8 justify-center rounded-sm border-transparent bg-red-500 px-3 font-bold text-black shadow-sm hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error
