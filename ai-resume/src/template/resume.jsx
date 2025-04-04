import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Resume() {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-10 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-3xl p-8 border border-gray-300 dark:border-gray-700 mt-20">
          
          {/* Name & Position */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">John Doe</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Software Engineer</p>
          </motion.div>
  
          {/* Contact Information */}
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-2" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Phone className="w-5 h-5 mr-2" />
              <span>+123 456 7890</span>
            </div>
            <a href="#" className="flex items-center text-blue-500">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            <a href="#" className="flex items-center text-gray-700 dark:text-gray-300">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </div>
  
        {/* Section Border */}
        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Summary</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Passionate Software Engineer with 3+ years of experience in full-stack development.
            Proficient in React, Node.js, and modern web technologies. Enthusiastic about
            solving complex problems and building scalable applications.
          </p>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Experience</h2>
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Software Engineer</h3>
            <p className="text-gray-600 dark:text-gray-300">XYZ Tech | Jan 2021 - Present</p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300">
              <li>Developed and maintained React-based applications with optimized performance.</li>
              <li>Integrated REST APIs and enhanced backend functionalities using Node.js.</li>
            </ul>
          </div>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Personal Projects */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Projects</h2>
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Portfolio Website</h3>
            <p className="text-gray-600 dark:text-gray-300">Built a fully responsive portfolio using React and Tailwind.</p>
          </div>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Skills</h2>
          <div className="mt-3">
            <p className="text-gray-600 dark:text-gray-300">React.js, Node.js, JavaScript, TypeScript, Tailwind CSS, MongoDB, SQL</p>
          </div>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Education</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">B.Tech in Computer Science | ABC University | 2017 - 2021</p>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Achievements */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Achievements</h2>
          <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>Winner of Hackathon 2022</li>
            <li>Recognized as "Top Developer" in XYZ company</li>
          </ul>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Certifications</h2>
          <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>AWS Certified Developer</li>
            <li>React.js Advanced Certification</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
