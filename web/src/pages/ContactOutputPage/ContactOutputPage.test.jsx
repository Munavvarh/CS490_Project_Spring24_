import { render } from '@redwoodjs/testing/web'

import ContactOutputPage from './ContactOutputPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ContactOutputPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContactOutputPage />)
    }).not.toThrow()
  })
})
