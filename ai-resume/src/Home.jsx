import { motion } from "framer-motion";
import { FileText, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-10 overflow-x-hidden">
      {/* Title Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
        >
          Create Your <span className="text-purple-500">Dream CV</span> Effortlessly ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-gray-600 dark:text-gray-300 mt-3 text-base sm:text-lg px-2"
        >
          🚀 Build a professional resume in minutes with our easy-to-use tools. Showcase your 
          <strong> skills, experience,</strong> and <strong>achievements</strong> with stunning templates.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-gray-600 dark:text-gray-300 mt-4 text-sm sm:text-lg"
        >
          <Typewriter
            words={[
              "📢 Stand out with a unique and eye-catching resume!",
              "💡 Let your experience shine with the perfect format!",
              "🚀 Take your career to the next level today!"
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </motion.p>
      </motion.div>

      {/* Feature Cards with Horizontal Slide Animation for Mobile */}
      <motion.div
        className="mt-8 w-full max-w-3xl px-4 overflow-x-auto"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex space-x-6 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:space-x-0 gap-6">
          {[
            { icon: FileText, text: "📜 Choose from Stunning Templates" },
            { icon: CheckCircle, text: "🛠️ ATS-Friendly & Optimized" },
            { icon: Sparkles, text: "🎯 Personalized Resume Tips" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[300px] sm:min-w-0"
            >
              <item.icon className="w-8 h-8 text-purple-500" />
              <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm sm:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button with Animation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/resumeForm")}
        className="mt-8 bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-lg transition hover:shadow-xl text-sm sm:text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
      >
        🚀 Create CV Now
      </motion.button>
    </div>
  );
}
