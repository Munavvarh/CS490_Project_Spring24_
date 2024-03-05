// web/src/components/NavBar/NavBar.js

import { Link } from '@redwoodjs/router'

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        {/* saved your logo in the public directory */}
        <img src="/logo.png" alt="Syntax Switch Logo" className="logo-image" />
      </Link>
      <ul className="navbar-nav flex">
        <li className="navbar-item ">
          <Link to="/home" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item ">
          <Link to="/Translator Tool" className="navbar-link">Translator Tool</Link>
        </li>
        <li className="navbar-item ">
          <Link to="/Documentation" className="navbar-link ">Documentation</Link>
        </li>
        <li className="navbar-item ">
          <Link to="/Feedback" className="navbar-link ">Feedback</Link>
        </li>
        <li className="navbar-item ">
          <Link to="/login" className="navbar-link ">Login/Signup</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
