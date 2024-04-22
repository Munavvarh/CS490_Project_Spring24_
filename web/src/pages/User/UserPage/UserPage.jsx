import { Metadata } from '@redwoodjs/web'

import UserCell from 'src/components/User/UserCell'

const UserPage = ({ id }) => {
  return (
    <>
      <Metadata title="User" description="User Page" />
      <UserCell id={id} />
    </>
  )
}

export default UserPage
