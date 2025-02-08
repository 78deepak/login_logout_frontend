import React, { useState, useContext } from 'react';
import { handleerror, handleSuccess } from '../utills'; // Make sure the path is correct
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the context
import { FadeLoader } from 'react-spinners';
import bgImage from '../assest/5096154.jpg';
import { jwtDecode } from 'jwt-decode';


// function Login() {
//   const navigate = useNavigate();
//   const { setEmail } = useContext(AuthContext); // Use the context to set email
//   const [loading, setLoading] = useState(false);

//   const [login, setlogin] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setlogin(prevLogin => ({ ...prevLogin, [name]: value }));
//   };

//   const handlelogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = login;
//     setLoading(true);

//     if (!email || !password) {
//       return handleerror('Email and password are required');
//     }

//     try {
//       const url = 'https://login-logout-backend-3.onrender.com/auth/login'; // Ensure this URL is correct
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(login)
//       });

//       const result = await response.json();
//       const { success, message, jwtToken, email: userEmail, error, name } = result; // Destructure result

//       if (error) {
//         const details = error?.details ? error.details[0].message : message;
//         handleerror(details || 'An unknown error occurred');
//       } else if (success) {
//         handleSuccess(message);
//         localStorage.setItem('token', jwtToken);
//         localStorage.setItem('loggedInUser', name);
//         localStorage.setItem('email', userEmail);
//         setEmail(userEmail); // Set the email in context

//         setTimeout(() => {
//           navigate('/home', { state: { email: userEmail } });
//         }, 1000);
//       } else {
//         handleerror(message || 'Login failed. Please try again.');
//       }

//     } catch (err) {
//       handleerror(err.message || 'An error occurred during login');
//     }
//     finally {
//       setLoading(false);  // Stop loading once the process is done
//     }
//   };


function Login() {
  const navigate = useNavigate();
  const { setEmail } = useContext(AuthContext); // Use the context to set email
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin(prevLogin => ({ ...prevLogin, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    setLoading(true);

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = 'https://login-logout-backend-3.onrender.com/auth/login'; // Ensure this URL is correct
      // const url = 'http://localhost:8080/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });

      const result = await response.json();
      const { success, message, jwtToken, email: userEmail, error, name } = result;

      if (error) {
        const details = error?.details ? error.details[0].message : message;
        handleError(details || 'An unknown error occurred');
      } else if (success) {
        handleSuccess(message);
        
        // Store token and user info
        localStorage.setItem('token', jwtToken);
        // sessionStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('email', userEmail);
        setEmail(userEmail);

        // Decode token to get expiration time
        const decodedToken = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;  // Current time in seconds

        // Calculate time left until token expires
        const timeLeft = (decodedToken.exp - currentTime) * 1000;

        // Set timeout to auto-logout when token expires
        setTimeout(() => {
          alert('Session expired. You will be logged out.');
          localStorage.removeItem('token');
          // sessionStorage.removeItem('token')
          localStorage.removeItem('loggedInUser');
          localStorage.removeItem('email');
          navigate('/login'); // Redirect to login page
        }, timeLeft);

        // Redirect to home page after successful login
        setTimeout(() => {
          navigate('/home', { state: { email: userEmail } });
        }, 1000);
      } else {
        handleError(message || 'Login failed. Please try again.');
      }

    } catch (err) {
      handleError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Handle error display
  const handleError = (message) => {
    alert(message);  // You can replace this with a custom error UI
  };

  // Handle success display
  const handleSuccess = (message) => {
    alert(message);  // You can replace this with a custom success UI
  };

  return (
    <div className='container bg-cyan-200 min-w-full h-screen flex items-center justify-center'
    style={{ backgroundImage:  `url(${bgImage})`,
    backgroundSize: '100%',
   }}
    >
      <form onSubmit={handleLogin} className="backdrop-blur-sm border border-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">Login</h2>

  <div className="mb-3 sm:mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      value={login.email}
      placeholder="Enter email"
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base"
    />
  </div>

  <div className="mb-3 sm:mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      value={login.password}
      placeholder="Enter password"
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base"
    />
  </div>

  <div className="mb-4 sm:mb-6 py-2 sm:py-3">
    <button
      type="submit"
      className={`w-full bg-red-500 text-white py-2 rounded-md transition duration-300 transform shadow-md ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader size={15} color="#fff" className="mr-2" />
          <span className="text-white">Loading...</span>
        </div>
      ) : (
        'Login'
      )}
    </button>
  </div>

  <div className="text-center">
    <p className="text-white text-sm">
      If you don't have an account, please <Link to="/signup" className="text-red-500 hover:underline underline">signup</Link>
    </p>
  </div>
</form>

    </div>
  );
}

export default Login;
