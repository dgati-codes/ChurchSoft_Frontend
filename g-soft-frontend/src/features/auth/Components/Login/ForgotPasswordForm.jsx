import React, { useState } from 'react';
import ResetCodeForm from './ResetCodeForm';

/**
 * ForgotPasswordForm component: handles the forgot password form and sends a verification email.
 */
function ForgotPasswordForm({ onBackToLoginForm }) {
  // State variables to control the visibility of the forgot password form and reset code form
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
  const [showResetCodeForm, setShowResetCodeForm] = useState(false);

  /**
   * Handles the "Send email" button click: sends a verification email and shows the reset code form.
   */
  const handleSendEmail = (e) => {
    e.preventDefault();
    setShowForgotPasswordForm(false);
    setShowResetCodeForm(true);
  };

  /**
   * Handles the "Back to Forgot Password Form" button click: shows the forgot password form and hides the reset code form.
   */
  const handleBackToForgotPasswordForm = () => {
    setShowForgotPasswordForm(true);
    setShowResetCodeForm(false);
  };

  return (
    <>
      {showForgotPasswordForm && (
        <div className="flex w-[900px] max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
          {/* Left side of the forgot password form: displays a background image */}
          <div className="md:w-1/2 w-full">
            <img src="/images/church.jpg" alt="Church building" className="w-full h-full object-cover"/>
          </div>

          {/* Right side of the forgot password form: displays the forgot password form */}
          <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
            <div className="text-center mb-8">
              <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto mb-4"/>
              <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
              <p className="text-gray-500 mt-2 pt-8">Please enter your email to send verification link to reset your password</p>
            </div>

            {/* Forgot password form */}
            <form className="w-full max-w-xs" onSubmit={handleSendEmail}>
              <div className="mb-4">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Send email button */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200  mb-2.5"
              >
                Send email 
              </button>

              {/* Back to login button */}
              <button 
                type="button" 
                className="text-sm text-blue-600  hover:text-blue-800 hover:underline hover:cursor-pointer"
                onClick={onBackToLoginForm}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reset code form */}
      {showResetCodeForm && (
        <ResetCodeForm 
          onBackToForgotPasswordForm={handleBackToForgotPasswordForm}
          onBackToLoginForm={onBackToLoginForm}
        />
      )}
    </>
  );
}

export default ForgotPasswordForm;