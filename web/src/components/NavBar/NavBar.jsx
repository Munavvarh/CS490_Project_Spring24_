// web/src/components/NavBar/NavBar.js
import { Link } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const NavBar = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        {/* saved your logo in the public directory */}
        <img src="/logo.png" alt="Syntax Switch Logo" className="logo-image" />
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
          <Link to="/contact-us" className="navbar-link ">
            Contact Us
          </Link>
        </li>
        <li className="navbar-item ">
          {isAuthenticated ? (
            <button onClick={logOut}>Log Out</button>
          ) : (
            <Link to="/login" className="navbar-link ">
              Login/Signup
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
