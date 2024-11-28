import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleerror, handleSuccess } from '../utills';

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Optional: pass email if needed for other purposes
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      setLoading(false);
      return handleerror('Verification code is required');
    }

    try {
      const url = 'http://localhost:8080/auth/VerfiyEmail'; // Adjust endpoint name to match backend
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: otp }), // Send the OTP code in the correct format
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleSuccess(result.message || 'Email verified successfully');
        setTimeout(() => navigate('/home'), 1000); // Navigate to home on successful verification
      } else {
        handleerror(result.message || 'Invalid or expired verification code');
      }
    } catch (error) {
      handleerror('Internal server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-gray-300 min-w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleVerifyOtp}
        className="p-8 rounded-lg shadow-lg w-full max-w-sm backdrop-blur-sm border border-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Verify Email</h1>
        <div>
          <label className="block text-sm font-medium mb-1 text-white" htmlFor="otp">
            Verification Code:
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="py-4">
          <button
            type="submit"
            className={`w-full bg-red-500 text-white py-2 rounded-md transition duration-300 transform shadow-md ${
              loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'
            }`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOTP;
