import { render } from '@redwoodjs/testing/web'

import AdminNavigatePage from './AdminNavigatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNavigatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNavigatePage />)
    }).not.toThrow()
  })
})
