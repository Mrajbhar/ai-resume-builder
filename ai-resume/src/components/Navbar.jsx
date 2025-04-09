import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Menu, X } from "lucide-react"; // Importing Menu (hamburger) and X (close) icons
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu visibility

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
    setIsMenuOpen(false); // Close the mobile menu on logout
    navigate("/login");
  };

  // Helper function to get the first letter from email or name
  const getFirstLetter = (email) => {
    if (email) {
      return email.charAt(0).toUpperCase(); // Get the first letter of the email
    }
    return "U"; // Default if no name or email
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 shadow-md px-6 py-4 transition-all duration-500 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
          >
            EliteResume
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Build Your Dream CV
          </p>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-purple-600 dark:text-purple-400"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Services", "Templates", "Pricing"].map((item) => {
            let path;
            if (item === "Home") path = "/";
            else if (item === "Templates") path = "/resume2"; // 👈 Custom path
            else path = `/${item.toLowerCase()}`;

            return (
              <Link
                key={item}
                to={path}
                className="relative text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Desktop Search, Theme Toggle & Login/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          {/* Profile/Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {/* Display the first letter of the email */}
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                  {user?.email ? getFirstLetter(user.email) : "U"}
                </div>
                <span className="text-purple-500 dark:text-purple-400"></span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    <p className="font-semibold">Email:</p>
                    <p>{user?.email}</p>
                  </div>
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

      {/* Mobile Navbar Links */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white dark:bg-gray-800 p-6 space-y-4`}
      >
        {/* Add Theme Toggle to Mobile */}
        <div className="flex justify-between items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-purple-600 dark:text-purple-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {["Home", "About", "Services", "Templates", "Pricing"].map((item) => {
          let path;
          if (item === "Home") path = "/";
          else if (item === "Templates") path = "/resume2"; // 👈 Custom path
          else path = `/${item.toLowerCase()}`;

          return (
            <Link
              key={item}
              to={path}
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
              className="block text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400 transition"
            >
              {item}
            </Link>
          );
        })}

        {/* Login/Profile Button */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              {/* Display the first letter of the email */}
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                {user?.email ? getFirstLetter(user.email) : "U"}
              </div>
              <span className="text-purple-500 dark:text-purple-400"></span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4 mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
                <div className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  <p className="font-semibold">Email:</p>
                  <p>{user?.email}</p>
                </div>
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
    </nav>
  );
}
