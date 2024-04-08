import Contact from 'src/components/Contact'

export const QUERY = gql`
  query FindContactListQuery {
    contacts {
      id
      createdAt
      subject
      message
      user {
        email
      }
      userId
      wantResponse
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="text-center text-gray-500"></div>
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ contacts }) => {
  return (
    <div className="space-y-4">
      {contacts &&
        contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
    </div>
  )
}
