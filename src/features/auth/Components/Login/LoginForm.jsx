import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../../App.css";
import { useAuth } from "../../../../context/AuthContext";
import { User, KeyRound } from 'lucide-react';


function LoginForm() {
  const { login } = useAuth(); 
  // const [showLoginForm, setShowLoginForm] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(credentials); 

      if (result.success) {
        navigate("/dashboard"); 
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError(""); 
  };

  // const handleBackToLogin = () => {
  //   setShowLoginForm(true);
  // };

  return (
    <>
      {/* {showLoginForm && ( */}
        <div className="flex w-full h-screen font-[DM Sans]">

          {/* LEFT SIDE */}
          <div className="relative w-1/2 h-full overflow-hidden">
            <img src="/images/login_bg.jpg" alt="Church building" className="absolute inset-0 w-full  h-full object-cover" />
            <div className="absolute inset-0 bg-[#32A9FF]/60"></div>
            <div className="absolute inset-0 bg-linear-to-b from-[#32A9FF]/40 to-[#577EFFE0]"></div>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "url('/images/pattern.png')",
              backgroundSize: "300px",              
              backgroundRepeat: "repeat",
            }}></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white tracking-wide">
              <img src="/images/logo.png" alt="Church logo" className="w-24 h-24 mb-5" />
              <h2 className="text-[20px] font-semibold leading-relaxed">
                Welcome To The Great Commission Church <br />
                International Management Portal
              </h2>
              <p className="mt-6 text-sm opacity-90">Kindly Sign In To Proceed</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2 bg-white flex items-center justify-center relative">
            <div className="absolute bottom-0 right-0 opacity-20" style={{
              backgroundImage: "url('/images/login_right_shapes.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "380px",
              width: "380px",
              height: "380px",
            }}></div>

            <div className="w-87.5 mx-auto flex flex-col items-center justify-center">
              <div className="text-center mb-10">
                <h1 className="text-[22px] font-semibold text-gray-800">Welcome Back</h1>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm w-full">
                  {error}
                </div>
              )}

              {/* LOGIN FORM */}
              <form onSubmit={handleLogin} className="w-full ">
                <label htmlFor="username" className="text-[12px]  font-bold">
                    User Name
                  </label>

                  <div className="w-87.5 mx-auto mb-4 relative z-10">
                    {/* Icon */}
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <User className="text-blue-600"/>
                    </span>

                    {/* Input */}
                    <input
                      type="text"
                      id="username"
                      value={credentials.username || ""}
                      onChange={handleChange}
                      placeholder="Enter your user ID"
                      required
                      className="w-full pl-10 pr-3 py-2 border bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>


                  <label htmlFor="username" className="text-[12px] font-bold ">
                  Password</label>
                <div className="w-87.5 mx-auto mb-4 relative z-10">
                    {/* Icon */}
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <KeyRound className="text-blue-600"/>
                    </span>

                  <input
                    type="password"
                    id="password"
                    value={credentials.password || ""}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                      className="w-full pl-10 pr-3 py-2 border bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                  />
                </div>

                <div className="w-87.5 mx-auto flex flex-col items-center justify-center relative z-10">

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 cursor-pointer rounded-lg font-semibold text-white text-sm ${
                      loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <Link to="/forgot-password" className="text-sm text-blue-600 mt-6 hover:underline">
                  Forget Password?
                </Link>
              </form>
            </div>
          </div>
        </div>
      {/* )} */}

    </>
  );
}

export default LoginForm;
