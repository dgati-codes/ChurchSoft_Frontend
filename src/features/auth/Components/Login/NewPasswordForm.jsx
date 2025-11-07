import React, { useState } from 'react';
import ResetSuccess from './ResetSuccess';

function NewPasswordForm({ onBackToLogin }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(true);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const validatePasswords = () => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Reset password logic here (e.g., API call)

    setShowNewPasswordForm(false);
    setShowResetSuccess(true);
  };

  if (showResetSuccess) {
    return <ResetSuccess onBackToLogin={onBackToLogin} />;
  }

  return (
    <div className="fixed bg-[url('/images/pexels-valeriya-kobzar-42371713-8358604.jpg')] bg-cover bg-center inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="md:w-1/2 w-full">
          <img 
            src="/images/church.jpg" 
            alt="Church building" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto mb-4"/>
            <h1 className="text-3xl p-2 font-bold text-gray-800">New Password</h1>
            <p className="text-gray-500 mt-8">Create a new password</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-xs">
            {error && (
              <div className="mb-4 text-red-600 text-sm font-semibold">
                {error}
              </div>
            )}

            <div className="mb-4">
              <input 
                type="password" 
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
            </div>

            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordForm;
