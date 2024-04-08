import { render, screen } from '@redwoodjs/testing'

import Contact from './Contact'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Contact', () => {
  it('renders successfully', () => {
    const contact = {
      subject: 'great website',
      message:
        'i think that BMT is an extremely qualified group of developers bravo',
      createdAt: '2002-06-11T12:34:56Z',
      user: {
        email: 'user1@example.com',
      },
      wantResponse: true,
    }
    render(<Contact contact={contact} />)

    expect(screen.getByText(contact.subject)).toBeInTheDocument()
    expect(screen.getByText(contact.message)).toBeInTheDocument()
    const dateExpect = screen.getByText('11 June 2002 12:34:56 UTC')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', contact.createdAt)
  })
})
