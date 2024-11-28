import React, { useState } from 'react';
import { handleerror, handleSuccess } from '../utills';
import  { useNavigate,Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import bgImage from '../assest/5096154.jpg';

function Signup() {
    const Navigate = useNavigate();
     const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup(prevSignup => ({ ...prevSignup, [name]: value }));
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { name, email, password } = signup;
  
    if (!name || !email || !password) {
      setLoading(false);
      return handleerror('Name, email, and password are required');
    }
  
    try {
      const url = 'https://login-logout-backend-3.onrender.com/auth/signup';
      // const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signup),
      });
  
      if (!response.ok) {
        throw new Error('Failed to signup');
      }
  
      const result = await response.json();
      const { success, message, error } = result;
  
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate('/verify-otp', { state: { email } }); // Pass email to OTP page
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || 'Error occurred';
        handleerror(details);
      }
    } catch (error) {
      handleerror(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center '
     style={{ backgroundImage:  `url(${bgImage})`,
     backgroundSize: '100%',
    }}
     >
      <form onSubmit={handleSignup} className=" p-8 rounded-lg shadow-lg w-full max-w-sm backdrop-blur-sm border border-white">
        <h1 className="text-2xl font-bold mb-6 text-center  text-white">Sign Up</h1>
        <div>
          <label className="block text-sm font-medium  mb-1 text-white" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            // required
            autoFocus
            value={signup.name}
            placeholder='Enter name'
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
          />
        </div>
        <div>
          <label className="block text-sm font-medium  mb-1 text-white" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // required
            value={signup.email}
            placeholder='Enter email'
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // required
            value={signup.password}
            placeholder='Enter password'
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
          />
        </div>
        <div className='py-4'>
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
              'Signup'
            )}
          </button>
        </div>
        <div>
        <p className="text-white text-sm">if you have already an account click on <Link className='text-red-500 underline bold' to='/Login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;












