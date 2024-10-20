// import React, { Children, useState } from 'react';
// import { handleerror, handleSuccess } from '../utills'; // Make sure the path is correct
// import { useNavigate , Link} from 'react-router-dom';
// // import { createContext } from 'react';

// function Login() {
//   const navigate = useNavigate();
//   // const [myemail, setMyEmail] = useState();
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

//     if (!email || !password) {
//       return handleerror('Email and password are required');
//     }

//     try {
//       const url = 'http://localhost:8080/auth/login'; // Ensure this URL is correct
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(login)
//       });

//       const result = await response.json();
//       console.log(result);
//       console.log(result.email);
//       // setMyEmail(result.email);

//       const { success, message,jwtToken,email, error,name } = result; // Destructure result

//       if (error) {
//         // Check if there's an error and show the error message
//         const details = error?.details ? error.details[0].message : message;
//         handleerror(details || 'An unknown error occurred');
//       } else if (success) {
//         // Handle success and navigate to /home
//         handleSuccess(message);
//         localStorage.setItem('token',jwtToken);
//         localStorage.setItem('loggedInUser',name);
//         setTimeout(() => {
//           navigate('/home', { state: { email: email } });
//         }, 1000);
//       } else {
//         // If there's no error or success, show the message (fallback)
//         handleerror(message || 'Login failed. Please try again.');
//       }

//     } catch (err) {
//       // Handle any network or unexpected errors
//       handleerror(err.message || 'An error occurred during login');
//     }
//   };

//   return (
//     <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
//   <form onSubmit={handlelogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//     <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
    
//     <div className="mb-4">
//       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         required
//         value={login.email}
//         placeholder='Enter email'
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//       />
//     </div>

//     <div className="mb-4">
//       <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         required
//         value={login.password}
//         placeholder='Enter password'
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//       />
//     </div>

//     <div className="mb-6">
//       <button type='submit' className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">
//         Login
//       </button>
//     </div>

//     <div className="text-center">
//       <p className="text-gray-600 text-sm">
//         If you don't have an account, please <Link to='/signup' className="text-red-500 hover:underline">signup</Link>
//       </p>
//     </div>
//   </form>
// </div>

//   );
// }

// export default Login;











import React, { useState, useContext } from 'react';
import { handleerror, handleSuccess } from '../utills'; // Make sure the path is correct
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the context
import { FadeLoader } from 'react-spinners';


function Login() {
  const navigate = useNavigate();
  const { setEmail } = useContext(AuthContext); // Use the context to set email
  const [loading, setLoading] = useState(false);

  const [login, setlogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogin(prevLogin => ({ ...prevLogin, [name]: value }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    setLoading(true);

    if (!email || !password) {
      return handleerror('Email and password are required');
    }

    try {
      const url = 'https://login-logout-backend-3.onrender.com/auth/login'; // Ensure this URL is correct
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });

      const result = await response.json();
      const { success, message, jwtToken, email: userEmail, error, name } = result; // Destructure result

      if (error) {
        const details = error?.details ? error.details[0].message : message;
        handleerror(details || 'An unknown error occurred');
      } else if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('email', userEmail);
        setEmail(userEmail); // Set the email in context

        setTimeout(() => {
          navigate('/home', { state: { email: userEmail } });
        }, 1000);
      } else {
        handleerror(message || 'Login failed. Please try again.');
      }

    } catch (err) {
      handleerror(err.message || 'An error occurred during login');
    }
    finally {
      setLoading(false);  // Stop loading once the process is done
  }
  };

  return (
    <div className='container bg-cyan-200 min-w-full h-screen flex items-center justify-center'>
      <form onSubmit={handlelogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={login.email}
            placeholder='Enter email'
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={login.password}
            placeholder='Enter password'
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-6">
        <button
  type='submit'
  className={`w-full bg-red-500 text-white py-2 rounded-md transition duration-300 transform shadow-md ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}`}
  disabled={loading} // Disable the button while loading
>
  {loading ? (
    <div className="flex justify-center items-center">
      <FadeLoader size={20} color="#000" className="mr-2" />
      <span className='text-black'>Loading...</span>
    </div>
  ) : (
    'Login'
  )}
</button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            If you don't have an account, please <Link to='/signup' className="text-red-500 hover:underline">signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
