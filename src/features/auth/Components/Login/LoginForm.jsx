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
        <div className="fixed inset-0 bg-[url('/images/pexels-valeriya-kobzar-42371713-8358604.jpg')] bg-cover bg-center flex items-center justify-center z-50">
          <div className="flex w-[400px] bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="w-[300px] mx-auto p-4 flex flex-col border border-blue-600 rounded-lg items-center justify-center m-12">
              <div className="text-center mb-6">
                <img
                  src="/images/logo.png"
                  alt="Church logo"
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-gray-800">GCCI</h1>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="w-full max-w-xs">
                <div className="mb-2.5">
                  <input
                    type="text"
                    id="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div></div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    onClick={handleToggle}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
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