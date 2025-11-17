import React, { useState } from 'react';
import ResetCodeForm from './ResetCodeForm';

/**
 * ForgotPasswordForm component: handles the forgot password form and sends a verification email.
 */
function ForgotPasswordForm({ onBackToLoginForm }) {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
  const [showResetCodeForm, setShowResetCodeForm] = useState(false);

  const handleSendEmail = (e) => {
    e.preventDefault();
    setShowForgotPasswordForm(false);
    setShowResetCodeForm(true);
  };

  const handleBackToForgotPasswordForm = () => {
    setShowForgotPasswordForm(true);
    setShowResetCodeForm(false);
  };

  return (
    <>
      {showForgotPasswordForm && (
          <div className="flex w-full h-screen font-[Poppins]">

  {/* LEFT SIDE */}
  <div className="relative w-1/2 h-full overflow-hidden">

    {/* BG IMAGE */}
    <img
      src="/images/login_bg.jpg"
      alt="Church building"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* BLUE OVERLAY */}
    <div className="absolute inset-0 bg-[#32A9FF]/60"></div>

    {/* GRADIENT OVERLAY */}
    <div className="absolute inset-0 bg-linear-to-b from-[#32A9FF]/40 to-[#577EFFE0]"></div>

    {/* HEX PATTERN OVERLAY */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "url('/images/pattern.png')",
        backgroundSize: "300px",
        backgroundRepeat: "repeat",
      }}
    ></div>

    {/* CENTERED TEXT */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white tracking-wide">
      <img
        src="/images/logo.png"
        alt="Church logo"
        className="w-24 h-24 mb-5"
      />

      <h2 className="text-[20px] font-semibold leading-relaxed">
        Welcome To The Great Commission Church <br />
        International Management Portal
      </h2>

      <p className="mt-6 text-sm opacity-90">Kindly Enter Your Email To Proceed</p>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-1/2 bg-white flex items-center justify-center relative">

    {/* RIGHT BG SHAPES (from screenshot) */}
    <div
      className="absolute bottom-0 right-0 opacity-20"
      style={{
        backgroundImage: "url('/images/login_right_shapes.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "380px",
        width: "380px",
        height: "380px",
      }}
    ></div>

    {/* LOGIN CARD */}
    <div className="w-[350px] mx-auto flex flex-col items-center justify-center">

      <div className="text-center mb-10">
        {/* <img
          src="/images/logo.png"
          alt="Church logo"
          className="w-24 h-24 mx-auto mb-4"
        /> */}
        <h1 className="text-[22px] font-semibold text-gray-800">Welcome Back</h1>
      </div>

                {/* Forgot password form */}
                <form className="w-full max-w-xs" onSubmit={handleSendEmail}>
                  <label htmlFor="email " className='text-[12px] font-medium text-gray-700'>Email</label>
                  <div className="mt-1">
                    <input 
                      type="email" 
                      placeholder="Enter email" 
                      id="email"
                      className="input"
                      required
                    />
                  </div>

                  {/* Send email button */}
                  <button 
                    type="submit" 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mb-2.5 hover:cursor-pointer"
                  >
                    Send email
                  </button>

                  {/* Back to login button */}
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline hover:cursor-pointer"
                    onClick={onBackToLoginForm}
                  >
                    Back to Login
                  </button>
 </form>
    </div>
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
