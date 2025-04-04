import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Menu, LogOut, User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  // Function to check login status
  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // Check login status on mount
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for changes in localStorage (detect login/logout)
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 shadow-md px-6 py-4 transition-all duration-500 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            EliteResume
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-300">Build Your Dream CV</p>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Services", "Templates", "Pricing"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Search, Theme Toggle & Login/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          {/* Profile/Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2 focus:outline-none">
                <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500 dark:border-purple-400" />
                <span className="text-purple-500 dark:text-purple-400">{user?.name || "User"}</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-500 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
