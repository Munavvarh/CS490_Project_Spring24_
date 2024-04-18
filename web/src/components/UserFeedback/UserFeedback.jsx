const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()} ${parsedDate.getUTCHours()}:${parsedDate.getUTCMinutes()}:${parsedDate.getUTCSeconds()} UTC`
}

const UserFeedback = ({ feedback, minimal }) => {
  return (
    <div className="rounded-lg bg-blue-200 p-8">
      <div>
        <header className="flex justify-between">
          <p>
            <b>Rating:</b> {feedback.score}
          </p>
          <time className="text-xs text-gray-600" dateTime={feedback.createdAt}>
            {formattedDate(feedback.createdAt)}
          </time>
        </header>
        <div className={minimal ? 'hidden' : ''}>
          <b>Email:</b> {minimal ? '' : feedback.User.email}
        </div>
        <p>
          <b>Review:</b> {feedback.review}
        </p>
        <div className={minimal ? 'hidden' : ''}>
          <b>Original Language:</b>{' '}
          {minimal ? '' : feedback.translation.originalLanguage}
        </div>
        <div className={minimal ? 'hidden' : ''}>
          <b>Translation Language:</b>{' '}
          {minimal ? '' : feedback.translation.translationLanguage}
        </div>

        <table
          className={
            minimal
              ? 'hidden'
              : 'w-fit table-fixed border-collapse grid-cols-2 grid-rows-2'
          }
        >
          <thead>
            <tr>
              <th className="border bg-opacity-20 border-black bg-blue-900 text-left">
                Code Input:
              </th>
              <th className="border bg-opacity-20 border-black bg-blue-900 text-left">
                Code Output:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border whitespace-pre-wrap border-black align-text-top">
                <code>{minimal ? '' : feedback.translation.originalCode}</code>
              </td>
              <td className="border whitespace-pre-wrap border-black align-text-top">
                <code>
                  {minimal ? '' : feedback.translation.translatedCode}
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserFeedback
