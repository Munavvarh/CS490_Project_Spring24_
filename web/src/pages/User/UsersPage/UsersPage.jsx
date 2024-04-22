import { Metadata } from '@redwoodjs/web'

import UsersCell from 'src/components/User/UsersCell'

const UsersPage = () => {
  return (
    <>
      <Metadata title="Users" description="Users Page" />
      <UsersCell />
    </>
  )
}

export default UsersPage
