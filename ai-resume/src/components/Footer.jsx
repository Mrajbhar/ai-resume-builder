import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-6 px-6 border-t border-gray-300 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <Link 
            to="/" 
            className="text-2xl font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-all"
          >
            EliteResume
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-400">Powering your career with the best resumes.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {[
            { Icon: Facebook, link: "https://facebook.com" },
            { Icon: Twitter, link: "https://twitter.com" },
            { Icon: Instagram, link: "https://instagram.com" },
            { Icon: Linkedin, link: "https://linkedin.com" }
          ].map(({ Icon, link }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-transform transform hover:scale-105"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} EliteResume. All rights reserved.
      </div>
    </footer>
  );
}
