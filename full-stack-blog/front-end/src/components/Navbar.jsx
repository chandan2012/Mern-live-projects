import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-4 p-4 bg-gray-800 text-white">
      <Link to="/">Home</Link>
      <Link to="/create-blog">Create Blog</Link>
    </nav>
  )
}

export default Navbar
