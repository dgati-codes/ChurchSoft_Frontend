import React, { useState } from 'react';
import ResetCodeForm from './ResetCodeForm';

/**
 * SignUp component: handles the forgot password form and sends a verification email.
 */
function SignUp({ onBackToLoginForm }) {
  // State variables to control the visibility of the forgot password form and reset code form
  const [showSignUp, setShowSignUp] = useState(true);
  

  /**
   * Handles the "Send email" button click: sends a verification email and shows the reset code form.
   */
  const handleSendEmail = (e) => {
    e.preventDefault();
    setShowSignUp(false);
    setShowResetCodeForm(true);
  };

  /**
   * Handles the "Back to Forgot Password Form" button click: shows the forgot password form and hides the reset code form.
   */
  const handleBackToSignUp = () => {
    setShowSignUp(true);
    setShowResetCodeForm(false);
  };

  return (
    <>
      {showSignUp && (
        <div className="flex w-[650px] h-[580px]  bg-white rounded-xl overflow-hidden shadow-2xl">
          {/* Left side of the forgot password form: displays a background image */}
          {/* <div className="md:w-1/2 w-full">
            <img src="/images/church.jpg" alt="Church building" className="w-full h-full object-cover"/>
          </div> */}

          {/* Right side of the forgot password form: displays the forgot password form */}
          <div className="w-[500px] h-135 mx-auto p-20 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-5">
            <div className="text-center mb-4">
              <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto "/>
              <h1 className="text-3xl font-bold text-gray-800">Create your account  </h1>
              <p className="text-gray-500 ">Join us in faith, fellowship, and grow with us.</p>
            </div>

            {/* Forgot password form */}
            <form className="w-full max-w-xs" onSubmit={handleSendEmail}>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Enter full Name" 
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  type="password" 
                  placeholder="Enter Password" 
                  id="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  type="number" 
                  placeholder="Enter your number" 
                  id="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Enter church" 
                  id="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Enter Role" 
                  id="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Send email button */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200  mb-2.5"
              >
               sign up
              </button>

              {/* Back to login button */}
              
            </form>
          </div>
        </div>
      )}

      
                
      
    </>
  );
}

export default SignUp;