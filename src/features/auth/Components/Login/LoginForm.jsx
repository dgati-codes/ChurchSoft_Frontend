import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api/userService";

import "../../../../App.css";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetSuccess from "./ResetSuccess";

function LoginForm({ onLoginSuccess }) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Destructure token too
      const { success, token, user, message } = await loginUser(credentials);

      if (success && token) {
        // ✅ Clear any stale token and store the new one
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", token);

        // ✅ Optional: If tokenHelper has a setter, use it instead
        // import { setAccessToken } from "../../../../utils/tokenHelper";
        // setAccessToken(token);

        if (onLoginSuccess) onLoginSuccess({ ...user, token }); // Pass token if parent needs it
        navigate("/dashboard");
      } else {
        setError(message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError(""); // Clear error on user typing
  };

  return (
    <>
      {showLoginForm && (
        
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

      <p className="mt-6 text-sm opacity-90">Kindly Sign In To Proceed</p>
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

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm w-full">
          {error}
        </div>
      )}

      {/* FORM (UNCHANGED LOGIC) */}
      <form onSubmit={handleLogin} className="w-full">
        <label htmlFor="username" className="text-[12px] font-medium text-gray-700">User Name </label>
        <div className="mb-4 mt-1">
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter your user ID"
            required
            className="input"
          />
        </div>

        <label htmlFor="password" className="text-[12px] font-medium text-gray-700">Password</label>
        <div className="mb-5 mt-1">
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition text-sm ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        
          <button
            type="button"
            onClick={handleToggle}
            className="text-sm text-blue-600 mt-6  hover:underline"
          >
            Forgot Password?
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