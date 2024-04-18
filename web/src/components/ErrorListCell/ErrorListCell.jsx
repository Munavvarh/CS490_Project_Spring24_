import { useState } from 'react'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [statusSearch, setStatusSearch] = useState('')
  const [titleSearch, setTitleSearch] = useState('') // Keep synchronized with your default or dynamic values
  const [trID, setTrID] = useState('') // Keep synchronized with your default or dynamic values

  let statusArr = ['']
  let trIDArr = []
  let titleArr = []
  for (let i of errors) {
    if (!statusArr.includes(i.status)) {
      statusArr.push(i.status)
    }
    if (!titleArr.includes(i.title)) {
      titleArr.push(i.title)
    }
    trIDArr.push(i.translation.id)
  }

  // For when someone changes the status of an error
  // with a unique status
  if (!statusArr.includes(statusSearch)) {
    setStatusSearch('')
  }

  const filteredErr = errors.filter(
    (er) =>
      (statusSearch == '' || er.status == statusSearch) &&
      (titleSearch == '' || er.title == titleSearch) &&
      (trID == '' || er.translation.id == trID) &&
      (
        er.translation.originalCode +
        ' ' +
        er.description +
        ' ' +
        er.status +
        ' ' +
        er.title +
        ' ' +
        er.translation.originalLanguage +
        ' ' +
        er.translation.translationLanguage
      )
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Toaster />

      <div className="flex">
        <select
          id="statusSearch"
          className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
          value={statusSearch}
          onChange={(e) => setStatusSearch(e.target.value)}
        >
          <option value="">Filter By Status</option>
          {statusArr.slice(1, statusArr.length).map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
        <select
          id="titleSearch"
          className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
        >
          <option value="">Filter By Title</option>
          {titleArr.map((titl) => (
            <option key={titl} value={titl}>
              {titl}
            </option>
          ))}
        </select>
        <select
          id="trID"
          className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
          value={trID}
          onChange={(e) => setTrID(e.target.value)}
        >
          <option value="">Filter By Translation ID</option>
          {trIDArr.map((tID) => (
            <option key={tID} value={tID}>
              {tID}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Errors"
          className="form-input mb-6 mt-1 py-2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4 space-y-4">
        {filteredErr.length > 0 ? (
          filteredErr
            .reverse()
            .map((error) => <Error key={error.id} error={error} />)
        ) : (
          <p>No errors found matching your search criteria.</p>
        )}
      </div>
    </>
  )
}
