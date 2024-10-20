import React, { useState } from 'react';
import { handleerror, handleSuccess } from '../utills';
import  { useNavigate,Link } from 'react-router-dom';

function Signup() {
    const Navigate = useNavigate();
     const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup(prevSignup => ({ ...prevSignup, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;
    if (!name || !email || !password) {
      return handleerror('Name, email, and password are required');
    }

    try {
      const url = 'https://login-logout-backend-3.onrender.com/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signup)
      });


      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      const result = await response.json();
      console.log(result);
      const {success, message,error} = result;
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
            Navigate('/login')
        },1000)
      }else if (error) {
        const details = error?.details[0].message;
        console.log(details);
        handleerror(details);
      }


    } catch (error) {
      handleerror(error.message);
    }
  };

  return (
    <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name:</label>
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
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
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
          <button type='submit' className='bg-red-600 w-full  rounded-md py-2 px-4 text-white'>Signup</button>
        </div>
        <div>
        <p className="text-gray-600 text-sm">if you have already an account click on <Link className='text-red-500' to='/Login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
