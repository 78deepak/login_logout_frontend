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
    <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between sm:justify-around p-4 border-b-2 bg-gradient-to-r from-cyan-500 to-orange-500  z-50 shadow-md">
      <Link
        to="/home" // Use Link for internal navigation
        className="flex items-center h-10 px-4 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
       Diary
      </Link>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        <Link to="/home" className="hover:text-gray-500">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-500">
          About
        </Link>
        <Link to="/contact" className="hover:text-gray-500">
          Contact
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/allpost" className="hover:text-gray-500">
              All Posts
            </Link>
            <Link to="/addpost" className="hover:text-gray-500">
              Add Post
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-gray-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-500">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-500">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
