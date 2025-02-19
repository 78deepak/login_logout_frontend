

import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { handleSuccess } from "../utills";
import { Link, useNavigate } from 'react-router-dom'; // Use Link for client-side routing

function Header({ isAuthenticated, setIsAuthenticated }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    // Show success message
    handleSuccess('User Logged out');

    // Update the isAuthenticated state to false to hide buttons
    setIsAuthenticated(false);

    // Navigate to the login page after a slight delay
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between p-4 border-b-2 bg-gradient-to-r from-gray-900 to-gray-700 z-50 shadow-md">
      <Link
        to="/home" // Use Link for internal navigation
        className="flex items-center h-10 px-4 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 rounded-tl-full rounded-br-full font-bold uppercase italic text-black hover:opacity-90"
      >
        {/* Logo */}
        <span className="text-xl">Diary</span>
      </Link>

      {/* Hamburger Menu Icon for Small Screens */}
      <div className="sm:hidden">
        <button onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <GrClose className="text-white" /> : <GiHamburgerMenu className="text-black" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`sm:flex justify-between items-center gap-4 font-semibold ${showMenu ? 'flex' : 'hidden'} sm:block flex-col sm:flex-row`}>
        <Link to="/home" className="hover:text-orange-400 text-xl text-white">
          Home
        </Link>
        <Link to="/AboutUs" className="hover:text-orange-400 text-xl text-white">
          About
        </Link>
        <Link to="/contact" className="hover:text-orange-400 text-xl text-white">
          Contact
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/allpost" className="hover:text-orange-400 text-xl text-white">
              All Posts
            </Link>
            <Link to="/addpost" className="hover:text-orange-400 text-xl text-white">
              Add Post
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-orange-400 text-xl text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-orange-400 text-xl text-white">
              Login
            </Link>
            <Link to="/signup" className="hover:text-orange-400 text-xl text-white">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
