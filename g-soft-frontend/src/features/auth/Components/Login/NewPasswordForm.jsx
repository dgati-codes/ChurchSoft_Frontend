import React, { useState } from 'react';
import ResetSuccess from './ResetSuccess';

/**
 * NewPasswordForm component: allows the user to enter a new password and confirm it.
 * After submission, it displays a success message and provides a button to navigate back to the login form.
 */
function NewPasswordForm({ onBackToLogin }) {
  // State variables to store the new password and its confirmation
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State variables to control the visibility of the new password form and the success message
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(true);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  /**
   * Handles the submission of the new password form: calls the password reset logic (TO DO)
   * and then hides the form and shows the success message.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    setShowNewPasswordForm(false);
    setShowResetSuccess(true);
  };

  // If the success message is visible, render the ResetSuccess component
  if (showResetSuccess) {
    return <ResetSuccess onBackToLogin={onBackToLogin} />;
  }

  // Otherwise, render the new password form
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
      <div className="md:w-1/2 w-full ">
        <img 
          src="/images/church.jpg" 
          alt="Church building" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto mb-4"/>
          <h1 className="text-3xl font-bold text-gray-800">New Password</h1>
          <p className="text-gray-500 mt-2">Create a new password</p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="mb-4">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition duration-200  mb-10.5"
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