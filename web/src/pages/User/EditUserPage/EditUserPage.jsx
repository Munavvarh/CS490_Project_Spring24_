import { Metadata } from '@redwoodjs/web'

import EditUserCell from 'src/components/User/EditUserCell'

const EditUserPage = ({ id }) => {
  return (
    <>
      <Metadata title="Edit User" description="Edit User Page" />
      <EditUserCell id={id} />
    </>
  )
}

export default EditUserPage
