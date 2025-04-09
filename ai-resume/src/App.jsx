import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./Auth/login";
import Home from "./Home";
import SignUpPage from "./Auth/SignUp";
import Resume from "./template/resume";
import ResumeForm from "./form/resumeform"
import Footer from "./components/Footer"; 
import ProfilePage from "./Auth/ProfilePage";
import Resume2 from "./template/resume2";

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
          <Route path="/resume2" element={<Resume2 />} />
          <Route path="/resumeForm" element={<ResumeForm />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}
