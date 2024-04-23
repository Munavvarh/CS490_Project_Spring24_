import { useState } from 'react'

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
        originalLanguage
        translationLanguage
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
    <div className="text-center text-gray-500">
      No user feedbacks yet! Make a translation and you can be the first!
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks, minimal, length = feedbacks.length }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [scoreSearch, setScoreSearch] = useState('')
  const [sourceLang, setSourceLang] = useState('') // Keep synchronized with your default or dynamic values
  const [targetLang, setTargetLang] = useState('') // Keep synchronized with your default or dynamic values
  const st = feedbacks.length > length ? feedbacks.length - length : 0

  const languageOptionsUpper = [
    'Python',
    'Java',
    'Javascript',
    'C++',
    'Ruby',
    'Go',
  ]
  const languageOptions = ['python', 'java', 'javascript', 'c++', 'ruby', 'go']

  const filteredFB = feedbacks.filter(
    (fb) =>
      (sourceLang == '' ||
        fb.translation.originalLanguage.toLowerCase() ==
          sourceLang.toLowerCase()) &&
      (targetLang == '' ||
        fb.translation.translationLanguage.toLowerCase() ==
          targetLang.toLowerCase()) &&
      (scoreSearch == '' || fb.score == scoreSearch) &&
      (
        fb.translation.originalCode +
        ' ' +
        fb.translation.translatedCode +
        ' ' +
        fb.User.email +
        ' ' +
        fb.review +
        ' ' +
        fb.translation.translationLanguage +
        ' ' +
        fb.translation.originalLanguage +
        ' ' +
        fb.score
      )
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  if (feedbacks.length < 5) {
    var start = 0
  } else {
    start = feedbacks.length - 5
  }
  return (
    <div className="space-y-4">
      {minimal ? (
        feedbacks &&
        feedbacks
          .slice(start, feedbacks.length)
          .reverse()
          .map((feedback) => (
            <UserFeedback
              minimal={minimal}
              key={feedback.id}
              feedback={feedback}
            />
          ))
      ) : (
        <>
          <div className="flex">
            <select
              id="sourceLang"
              className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <option value="">Filter By Source Language</option>
              {languageOptionsUpper.map((langOp) => (
                <option key={langOp} value={langOp.toLowerCase()}>
                  {langOp}
                </option>
              ))}
            </select>
            <select
              id="targetLang"
              className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="">Filter By Target Language</option>
              {languageOptionsUpper.map((langOp) => (
                <option key={langOp} value={langOp.toLowerCase()}>
                  {langOp}
                </option>
              ))}
            </select>
            <select
              id="scoreSearch"
              className="border focus:outline-none focus:ring-indigo-500 mr-4 mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
              value={scoreSearch}
              onChange={(e) => setScoreSearch(e.target.value)}
            >
              <option value="">Filter By Score</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              type="text"
              placeholder="Search User Feedbacks"
              className="form-input mb-6 mt-1 py-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredFB.length > 0 ? (
            filteredFB
              .reverse()
              .map((feedback) => (
                <UserFeedback key={feedback.id} feedback={feedback} />
              ))
          ) : (
            <p>No user feedbacks found matching your search criteria.</p>
          )}
        </>
      )}
    </div>
  )
}
