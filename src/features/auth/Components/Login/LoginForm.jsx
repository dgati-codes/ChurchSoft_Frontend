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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Backend login integration
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { success, token, user, message } = await loginUser({
        username,
        password,
      });

      if (success && token) {
        // ✅ Save user + token to localStorage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (onLoginSuccess) onLoginSuccess({ user, token });

        // ✅ Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(message || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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

  return (
    <>
      {showLoginForm && (
        <div className="fixed bg-[url('/images/pexels-valeriya-kobzar-42371713-8358604.jpg')] bg-cover bg-center inset-0 flex items-center justify-center z-50">
          <div className="flex w-[400px] max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
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

              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="w-full max-w-xs">
                <div className="mb-2.5">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    id="username"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    id="password"
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

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
