import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import { sendResetPasswordEmail } from '../../api/auth';  // API call for sending reset password email

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');
    setLoading(true);

    try {
      const response = await sendResetPasswordEmail(email);
      if (response.status === 200) {
        setMessage('Reset password link has been sent to your email.');
      }
    } catch (error) {
      setErrorMessage('Error sending reset password email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Sending email...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={() => navigate('/login')}
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
