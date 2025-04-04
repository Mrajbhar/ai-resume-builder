import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={() => setDarkMode((prev) => !prev)}
      className="relative flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-500 shadow-lg"
    >
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md"
        animate={{ x: darkMode ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {darkMode ? (
          <Sun className="w-4 h-4 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 text-gray-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
