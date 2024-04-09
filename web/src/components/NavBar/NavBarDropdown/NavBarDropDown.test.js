import { render, fireEvent } from '@testing-library/react'
import NavBarDropDown from './NavBarDropDown'

describe('NavBarDropDown', () => {
  //   it('renders the button', () => {
  //     const { getByTestId } = render(<NavBarDropDown />)
  //     const button = getByTestId('dropdown-button')
  //     expect(button).toBeInTheDocument()
  //   })
  //   it('does not render the menu initially', () => {
  //     const { queryByText } = render(<NavBarDropDown />)
  //     const menu = queryByText('Account Settings')
  //     expect(menu).not.toBeInTheDocument()
  //   })
  //   it('closes the menu when the button is clicked again', () => {
  //     const { getByTestId, queryByText } = render(<NavBarDropDown />)
  //     const button = getByTestId('dropdown-button')
  //     fireEvent.click(button)
  //     fireEvent.click(button)
  //     const menu = queryByText('Account Settings')
  //     expect(menu).not.toBeInTheDocument()
  //   })
})
