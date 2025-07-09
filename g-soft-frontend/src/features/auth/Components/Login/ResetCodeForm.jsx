import React, { useState, useRef, useEffect } from 'react';
import NewPasswordForm from './NewPasswordForm';

/**
 * ResetCodeForm component: allows the user to enter a verification code sent to their email.
 * After submission, it displays the NewPasswordForm component to reset the password.
 */
function ResetCodeForm({ onBackToForgotPassword, email }) {
  // State variables to control the visibility of the code verification and new password forms
  const [showCodeVerification, setShowCodeVerification] = useState(true);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  // Ref to store the input elements for the verification code
  const inputRefs = useRef([]);

  /**
   * Handles the submission of the verification code form: hides the code verification form
   * and shows the new password form.
   */
  const handleVerifyCode = (e) => {
    e.preventDefault();
    setShowCodeVerification(false);
    setShowNewPasswordForm(true);
  };

  /**
   * Handles the "Back" button click: calls the onBackToForgotPassword prop to reset the entire flow.
   */
  const handleBackToLoginForm = () => {
    // This would be passed up to App.jsx to reset the entire flow
    onBackToForgotPassword();
  };

  // Auto-focus and input jumping logic
  useEffect(() => {
    // Focus the first input element when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Add event listeners to each input element to focus the next input when a digit is entered
    const handleInput = (e, index) => {
      if (e.target.value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };

    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.addEventListener('input', (e) => handleInput(e, index));
      }
    });

    // Clean up event listeners when the component unmounts
    return () => {
      inputRefs.current.forEach((input, index) => {
        if (input) {
          input.removeEventListener('input', (e) => handleInput(e, index));
        }
      });
    };
  }, []);

  return (
    <>
      {showCodeVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="md:w-1/2 w-full">
            <img src="/images/church.jpg" alt="Church building" className="w-full h-full object-cover"/>
          </div>
          
          <div className="w-[300px] mx-auto p-4 flex flex-col border-[1px] border-blue-600 rounded-lg items-center justify-center m-12">
            <div className="text-center mb-8">
              <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mx-auto mb-4"/>
              <h1 className="text-3xl font-bold text-gray-800">Verification Code</h1>
              <p className="text-gray-500 mt-2 pt-4 pb-4">
                Enter the 6-digit code sent to {email ? email.replace(/(.{3}).+@(.+)/, "$1***@$2") : 'your email'}
              </p>
            </div>
            
            <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="password"
                    maxLength="1"
                    className="w-10 h-11 text-center border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    required
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        inputRefs.current[index - 1].focus();
                      }
                    }}
                  />
                ))}
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Verify Code
              </button>
              
              <div className="flex justify-between w-full mt-4">
                <button 
                  type="button" 
                  className="text-sm text-blue-600 pt-3 hover:text-blue-800 hover:underline hover:cursor-pointer"
                  onClick={handleBackToLoginForm}
                >
                  Back
                </button>
               
                <p className="text-xs text-gray-400">
                  Resend code in <span className="font-semibold">01:55</span>
                </p>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {showNewPasswordForm && (
        <NewPasswordForm onBackToLoginForm={handleBackToLoginForm} />
      )}
    </>
  );
}

export default ResetCodeForm;