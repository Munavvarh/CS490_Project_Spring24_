import { render, fireEvent } from '@testing-library/react'
import NavBarDropDown from './NavBarDropDown'

describe('NavBarDropDown', () => {
  it('renders the button', () => {
    const { getByText } = render(<NavBarDropDown />)
    const button = getByText('User')
    expect(button).toBeInTheDocument()
  })

  it('does not render the menu initially', () => {
    const { queryByText } = render(<NavBarDropDown />)
    const menu = queryByText('Account Settings')
    expect(menu).not.toBeInTheDocument()
  })

  it('closes the menu when the button is clicked again', () => {
    const { getByText, queryByText } = render(<NavBarDropDown />)
    const button = getByText('User')
    fireEvent.click(button)
    fireEvent.click(button)
    const menu = queryByText('Account Settings')
    expect(menu).not.toBeInTheDocument()
  })
})
