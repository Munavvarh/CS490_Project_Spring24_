// web/src/components/NavBar/NavBar.js
import { Link } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { gql } from 'graphql-tag'
import { GraphQLHooksProvider } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/auth'
import NavBarDropDown from './NavBarDropdown/NavBarDropDown'

const GET_USER_NAME = gql`
  query GetUserName($userId: Int!) {
    user(id: $userId) {
      name
      email
    }
  }
`

const NavBar = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  const { data } = useQuery(GET_USER_NAME, {
    variables: { userId: currentUser?.id },
    skip: !isAuthenticated || !currentUser,
  })

  useEffect(() => {}, [isAuthenticated]) //could be deleted later - wanted to make call once
  const user = data?.user || ''

  return (
    <GraphQLHooksProvider>
      <nav className="navbar">
        <Link to="/home" className="navbar-logo">
          <img
            src="/logo.png"
            alt="Syntax Switch Logo"
            className="logo-image"
          />
        </Link>
        <ul className="navbar-nav flex">
          <li className="navbar-item ">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item ">
            <Link to="/translation-output" className="navbar-link">
              Translator Tool
            </Link>
          </li>
          <li className="navbar-item ">
            <Link to="/documentation" className="navbar-link ">
              Documentation
            </Link>
          </li>
          <li className="navbar-item ">
            <Link to="/Feedback" className="navbar-link ">
              Feedback
            </Link>
          </li>
          <li className="navbar-item ">
            {isAuthenticated && currentUser ? (
              // <div className="relative inline-block text-left">
              //   <div>
              //     <button onClick={logOut}>Log Out - {user.name}</button>
              //   </div>
              // </div>
              <div>
                <div className="flex-grow block w-full lg:flex lg:w-auto lg:items-center">
                  <div className="lg:flex-grow text-sm">
                    <NavBarDropDown user={user} />
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="navbar-link ">
                Login/Signup
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </GraphQLHooksProvider>
  )
}

export default NavBar
