import { useState } from 'react';
import "../../../../App.css";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetSuccess from './ResetSuccess';

/**
 * LoginForm component: handles the login form and forgot password functionality.
 */
function LoginForm() {
  // State variables to control the visibility of the login form, forgot password form, and reset success message
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  /**
   * Toggles the visibility of the login form and forgot password form.
   */
  const handleToggle = () => {
    setShowLoginForm(false);
    setShowForgotPasswordForm(true);
  };

  /**
   * Handles the "Back to Login" button click: shows the login form and hides the forgot password form.
   */
  const handleBackToLoginForm = () => {
    setShowLoginForm(true);
    setShowForgotPasswordForm(false);
  };

  /**
   * Handles the "Back to Login" button click: shows the login form and hides the reset success message.
   */
  const handleBackToLogin = () => {
    setShowLoginForm(true);
    setShowResetSuccess(false);
  };

  return (
   
    <div className="flex items-center justify-center min-h-screen ">
       {showLoginForm && (
      
        <div className="flex w-[900px] max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
          {/* Left side of the login form: displays a background image */}
          <div className="md:w-1/2 w-full ">
            <img 
              src="/images/church.jpg" 
              alt="Church building" 
              className="w-full h-full object-cover "
            />
          </div>

          {/* Right side of the login form: displays the login form */}
          <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
            <div className="text-center mb-6">
              <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto mb-4"/>
              <h1 className="text-3xl font-bold text-gray-800">GCCI</h1>
              <p className="text-gray-500 mt-3.5 pt-3.5">Kindly enter your credentials to login.</p>
            </div>

            {/* Login form */}
            <form className="w-full max-w-xs">
              <div className="mb-2.5">
                <input 
                  type="text" 
                  placeholder="Username" 
                  id="username"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  placeholder="Password" 
                  id="password"
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Forgot password link */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  {/* <input 
                    type="checkbox" 
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  /> */}
                  {/* <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label> */}
                </div>
                <div>
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline hover:cursor-pointer"
                    onClick={handleToggle}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-3 rounded-lg transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot password form */}
      {showForgotPasswordForm && (
        <ForgotPasswordForm onBackToLoginForm={handleBackToLoginForm} />
      )}

      {/* Reset success message */}
      {showResetSuccess && (
        <ResetSuccess onBackToLoginForm={handleBackToLogin} />
      )}
      
    </div>
  
  );
}

export default LoginForm;