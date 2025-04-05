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
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-purple-500 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-500 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {user.name || `${user.firstName} ${user.lastName}`}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm flex items-center gap-1">
            <Mail className="w-4 h-4" /> {user.email}
          </p>
        </div>

        {/* Extra Info (Optional) */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your profile dashboard. You can customize this area
            however you'd like.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
