import { KeyRound, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../../../App.css";
import { useAuth } from "../../../../context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setError("");
    try {
      const result = await login(values);
      if (result.success) {
        reset();
        navigate("/dashboard");
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[DM Sans] bg-slate-50">
      {/* LEFT HERO */}
      <div className="relative w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
        <img
          src="/images/login_bg.jpg"
          alt="Church building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#32A9FF]/60"></div>
        <div className="absolute inset-0 bg-linear-to-b from-[#32A9FF]/40 to-[#577EFFE0]"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/pattern.png')",
            backgroundSize: "300px",
            backgroundRepeat: "repeat",
          }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white tracking-wide">
          <img
            src="/images/logo.png"
            alt="Church logo"
            className="w-20 h-20 mb-4 md:w-24 md:h-24"
          />
          <h2 className="text-lg md:text-2xl font-semibold leading-relaxed">
            Welcome To The Great Commission Church
            <span className="block mt-2 text-sm md:text-base">
              International Management Portal
            </span>
          </h2>
          <p className="mt-4 text-sm opacity-90">Kindly Sign In To Proceed</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-4 py-10 md:py-16 relative">
        <div
          className="hidden md:block absolute bottom-0 right-0 opacity-20"
          style={{
            backgroundImage: "url('/images/login_right_shapes.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "380px",
            width: "380px",
            height: "380px",
          }}
        ></div>

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-5 text-center text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                User Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <User className="text-blue-600" />
                </span>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Enter your user ID"
                  required
                  className="w-full pl-10 pr-3 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <KeyRound className="text-blue-600" />
                </span>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-3 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold text-white text-sm ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
