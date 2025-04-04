import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Login failed!");
  
      // Store user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      // Notify all components that user has logged in
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
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Google Sign-In Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4">
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">Sign in with Google</span>
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

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

        {/* Sign In Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300"
          onClick={handleLogin}
        >
          Sign In
        </motion.button>

        {/* Forgot Password */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4 hover:underline cursor-pointer">
          Forgot Password?
        </p>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Don't have an account?{" "}
          <span
            className="text-purple-500 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
