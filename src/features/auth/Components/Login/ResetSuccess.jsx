import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { Check } from 'lucide-react';



/**
 * ResetSuccess component: displays a success message after a password reset
 * and provides a button to navigate back to the login form.
 */
function ResetSuccess() {
  // State variables to control the visibility of the success message and login form
  const [showResetSuccess, setShowResetSuccess] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);

  /**
   * Handles the click event on the "Login" button: hides the success message
   * and shows the login form.
   */
  const handleBackToLogin = () => {
    setShowResetSuccess(false);
    setShowLoginForm(true);
  };

  return (
    <>
      {showResetSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="md:w-1/2 w-full ">
            <img
              src="/images/church.jpg"
              alt="Church building"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[300px] mx-auto p-10 flex flex-col border border-blue-600 rounded-lg items-center justify-center m-12">
            <div className="text-center mb-8">
              <Check className='w-25 h-25 text-green-600 border rounded-full bg-green-100 ml-18'/>
              <h1 className="text-3xl font-bold text-gray-800 mt-4">
                Reset Successful
              </h1>
              <p className="text-gray-500 ">
                You have successfully reset your password.
                <br />
                Please Login with your new password.
              </p>
            </div>

            <div className="w-full max-w-xs">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mb-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      {showLoginForm && <LoginForm />}
    </>
  );
}

export default ResetSuccess;