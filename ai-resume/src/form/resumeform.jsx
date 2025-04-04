import { useState } from "react";
import { FaPlus, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    linkedin: "",
    websiteLabel: "",
    websiteURL: "",
    github: "",
    summary: "",
  });

  const [workExperience, setWorkExperience] = useState([]);
  const [showWorkExperience, setShowWorkExperience] = useState(false);

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { company: "", jobTitle: "", city: "", country: "", startMonth: "", startYear: "", endMonth: "", endYear: "", description: "" }]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data Submitted:", formData, workExperience);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-6 pt-20">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create Your Resume</h2>

        {/* Personal Information */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Personal Information</h3>
        <div className="flex flex-col gap-4">
          {["firstName", "lastName", "jobTitle", "email", "phone"].map((field, index) => (
            <input key={index} type="text" name={field} placeholder={field.replace(/([A-Z])/g, " $1")} required 
              className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field]} onChange={handleChange} />
          ))}
        </div>

        {/* Location */}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Location</h3>
        <div className="flex flex-col gap-4">
          {["address", "city", "state", "country", "zipCode"].map((field, index) => (
            <input key={index} type="text" name={field} placeholder={field.replace(/([A-Z])/g, " $1")} 
              className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field]} onChange={handleChange} />
          ))}
        </div>

        {/* Social Links */}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Website & Social Links</h3>
        <div className="flex flex-col gap-4">
          {["linkedin", "websiteLabel", "websiteURL", "github"].map((field, index) => (
            <input key={index} type="text" name={field} placeholder={field.replace(/([A-Z])/g, " $1")} 
              className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field]} onChange={handleChange} />
          ))}
        </div>

        {/* Summary */}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Professional Summary</h3>
        <textarea name="summary" placeholder="Summary" 
          className="textarea-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={formData.summary} onChange={handleChange}></textarea>

        {/* Work Experience */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-800 dark:text-gray-200 cursor-pointer" 
            onClick={() => setShowWorkExperience(!showWorkExperience)}>
            Work Experience {showWorkExperience ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {showWorkExperience && workExperience.map((exp, index) => (
            <div key={index} className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm flex flex-col gap-4 bg-gray-100 dark:bg-gray-700">
              <input type="text" placeholder="Company Name" className="input-field" 
                value={exp.company} onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)} />
              <input type="text" placeholder="Job Title" className="input-field" 
                value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(index, "jobTitle", e.target.value)} />
              <textarea placeholder="Role Description" className="textarea-field" 
                value={exp.description} onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}></textarea>
            </div>
          ))}
          {showWorkExperience && 
            <button type="button" onClick={addWorkExperience} 
              className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center">
              <FaPlus className="mr-2" /> Add Work Experience
            </button>}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 mt-6">
          <button type="submit" 
            className="w-full bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center">
            <FaPaperPlane className="mr-2" /> Create Resume
          </button>
        </div>
      </form>
    </div>
  );
}
