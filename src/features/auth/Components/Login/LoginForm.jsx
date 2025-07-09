import { useState } from 'react';
import "../../../../App.css";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetSuccess from './ResetSuccess';
import ResetCodeForm from './ResetCodeForm';


/**
 * LoginForm component: handles the login form and forgot password functionality.
 */
function LoginForm({ onLoginSuccess }) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleToggle = () => {
    setShowLoginForm(false);
    setShowForgotPasswordForm(true);
  };

  const handleBackToLoginForm = () => {
    setShowLoginForm(true);
    setShowForgotPasswordForm(false);
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
    setShowResetSuccess(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess(); // inform parent to hide login and show dashboard
  };

  return (
    <>
      {showLoginForm && (
        <div className="fixed inset-0 bg-black  flex items-center justify-center z-50">
          <div className="flex w-[900px] max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Left image */}
            <div className="md:w-1/2 w-full">
              <img
                src="/images/church.jpg"
                alt="Church building"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right form */}
            <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
              <div className="text-center mb-6">
                <img
                  src="/images/logo.png"
                  alt="Church logo"
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-gray-800">GCCI</h1>
                <p className="text-gray-500 mt-3.5 pt-3.5">
                  Kindly enter your credentials to login.
                </p>
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

                {/* Forgot password */}
                <div className="flex justify-between items-center mb-6">
                  <div></div>
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
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-3 rounded-lg transition duration-200"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showForgotPasswordForm && (
        <ForgotPasswordForm onBackToLoginForm={handleBackToLoginForm} />
      )}

      {showResetSuccess && (
        <ResetSuccess onBackToLoginForm={handleBackToLogin} />
      )}
    </>
  );
}


export default LoginForm;