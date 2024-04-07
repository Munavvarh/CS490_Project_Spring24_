import { Link } from '@redwoodjs/router'
import { useState } from 'react'
import { GraphQLHooksProvider } from '@redwoodjs/web'
import { useAuth } from 'src/auth'

const NavBarDropDown = ({ user }) => {
  const { logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <GraphQLHooksProvider>
      <div className="relative">
        <button
          id="dropdown-button"
          className="gap-x-1.5 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
          onClick={toggleMenu}
          aria-expanded="true"
          aria-haspopup="true"
        >
          {user.name}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg">
            <div className="py-2">
              <div className="block px-4 py-2 text-gray-700">
                <div className="text-gray-500">Signed in as:</div>
                {user.email}
              </div>
              <hr className="border-t border-grey-light mx-2"></hr>
              <Link
                to="/edit-profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Account Settings
              </Link>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={logOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </GraphQLHooksProvider>
  )
}

export default NavBarDropDown
