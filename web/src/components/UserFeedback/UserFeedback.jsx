const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()} ${parsedDate.getUTCHours()}:${parsedDate.getUTCMinutes()}:${parsedDate.getUTCSeconds()} UTC`
}

const UserFeedback = ({ feedback }) => {
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
        <p>
          <b>Email:</b> {feedback.email}
        </p>
        <p>
          <b>Review:</b> {feedback.review}
        </p>

        <table className="w-fit table-fixed border-collapse grid-cols-2 grid-rows-2">
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
              <td className="border border-black">
                <code>{feedback.codeInput}</code>
              </td>
              <td className="border border-black">
                <code>{feedback.codeOutput}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserFeedback
