import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";  // Import GoogleLogin from react-oauth/google
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong");
      }

      alert("✅ Signup successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (response) => {
    try {
      const { credential } = response;

      // Send the Google token to the backend for verification
      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Google login failed!");

      // Store user data from Google
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Notify all components that the user has logged in
      window.dispatchEvent(new Event("storage"));

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Create Account
        </h2>

        {/* Google Sign-Up Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google login failed")}
          useOneTap
          theme="outline"
          shape="rectangular"
          width="100%"
          text="signin_with"
        />

        {/* OR Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* First Name Input */}
        <input
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 mb-3"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        {/* Last Name Input */}
        <input
          type="text"
          placeholder="Last Name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 mb-3"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Show Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        {/* Sign Up Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleSignup}
          className={`w-full ${loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"} text-white py-2 rounded-lg shadow-md transition-all duration-300`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </motion.button>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-500 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </motion.div>
    </div>
  );
}
