import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.h2
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user.name || `${user.firstName} ${user.lastName}`}
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" /> {user.email}
          </p>
        </div>

        {/* Extra Info */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Welcome to your professional profile. Here, you can manage your
            personal information and update it as needed.
          </motion.p>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md mt-4 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
