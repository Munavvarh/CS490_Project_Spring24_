const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()} ${parsedDate.getUTCHours()}:${parsedDate.getUTCMinutes()}:${parsedDate.getUTCSeconds()} UTC`
}

const Contact = ({ contact }) => {
  return (
    <div className="rounded-lg bg-purple-200 p-8">
      <div>
        <header className="flex justify-between">
          <p>
            <b>Email:</b> {contact.user.email}
          </p>
          <time className="text-xs text-gray-600" dateTime={contact.createdAt}>
            {formattedDate(contact.createdAt)}
          </time>
        </header>
        <p>
          <b>Subject:</b> {contact.subject}
        </p>
        <p>
          <b>Message:</b>
        </p>
        <p>{contact.message}</p>
        <p>
          <b>Wants Reponse?:</b> {contact.wantResponse ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  )
}

export default Contact
