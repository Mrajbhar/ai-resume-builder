import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./Auth/login";
import Home from "./Home";
import SignUpPage from "./Auth/SignUp";
import Resume from "./template/resume";
import ResumeForm from "./form/resumeform"
import Footer from "./components/Footer"; 

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resumeForm" element={<ResumeForm />} />

        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}
