import { render } from '@redwoodjs/testing/web'

import ErrorOutputPage from './ErrorOutputPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ErrorOutputPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ErrorOutputPage />)
    }).not.toThrow()
  })
})
