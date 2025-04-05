import { useState } from "react";
import { FaPlus, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom"; 

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
    summaryPoints: [], 
    skills: { 
      programmingLanguages: [],
      developmentFrameworks: [],
      versionControl: [],
      databaseManagement: [],
      ideAndTools: [],
    },
    education: [], 
  });

  const [workExperience, setWorkExperience] = useState([]);
  const [personalProjects, setPersonalProjects] = useState([]);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [showPersonalProjects, setShowPersonalProjects] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: "",
        jobTitle: "",
        city: "",
        state: "",
        country: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        responsibilities: [""], 
       
      },
    ]);
  };

  const addPersonalProject = () => {
    setPersonalProjects([
      ...personalProjects,
      {
        projectName: "",
        description: [""], // Description points as an array
        url: "",
        github: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
      },
    ]);
  };


  

  const handleDescriptionChange = (projectIndex, descriptionIndex, value) => {
    const updatedProjects = [...personalProjects];
    updatedProjects[projectIndex].description[descriptionIndex] = value;
    setPersonalProjects(updatedProjects);
  };

  const addDescriptionPoint = (index) => {
    const updatedProjects = [...personalProjects];
    updatedProjects[index].description.push(""); // Add an empty description point
    setPersonalProjects(updatedProjects);
  };

  const removeDescriptionPoint = (projectIndex, descriptionIndex) => {
    const updatedProjects = [...personalProjects];
    updatedProjects[projectIndex].description.splice(descriptionIndex, 1);
    setPersonalProjects(updatedProjects);
  };


  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  const handleResponsibilityChange = (expIndex, responsibilityIndex, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[expIndex].responsibilities[responsibilityIndex] = value;
    setWorkExperience(updatedExperience);
  };

  // Function to add new responsibility
  const addResponsibility = (index) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index].responsibilities.push(""); // Add an empty responsibility
    setWorkExperience(updatedExperience);
  };

  
  const handlePersonalProjectChange = (index, field, value) => {
    const updatedProjects = [...personalProjects];
    updatedProjects[index][field] = value;
    setPersonalProjects(updatedProjects);
  };

  const handleSummaryChange = (index, value) => {
    const updatedPoints = [...formData.summaryPoints];
    updatedPoints[index] = value;
    setFormData({ ...formData, summaryPoints: updatedPoints });
  };

  const addSummaryPoint = () => {
    setFormData({ ...formData, summaryPoints: [...formData.summaryPoints, ""] });
  };

  const removeSummaryPoint = (index) => {
    const updatedPoints = formData.summaryPoints.filter((_, i) => i !== index);
    setFormData({ ...formData, summaryPoints: updatedPoints });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data Submitted:", formData, workExperience, personalProjects);
  
    // Optionally, reset form data after submission:
    setFormData({
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
      summaryPoints: [],
    });
    setWorkExperience([]);
    setPersonalProjects([]);
  };
  

  // Skills Section
const handleSkillsChange = (category, index, value) => {
  const updatedSkills = { ...formData.skills };
  updatedSkills[category][index] = value;
  setFormData({ ...formData, skills: updatedSkills });
};

const addSkill = (category) => {
  const updatedSkills = { ...formData.skills };
  updatedSkills[category].push(""); // Add a new empty skill
  setFormData({ ...formData, skills: updatedSkills });
};

const removeSkill = (category, index) => {
  const updatedSkills = { ...formData.skills };
  updatedSkills[category].splice(index, 1); // Remove skill
  setFormData({ ...formData, skills: updatedSkills });
};

// Education Section
const addEducation = () => {
  setFormData({
    ...formData,
    education: [
      ...formData.education,
      { degree: "", institution: "", startYear: "", endYear: "", location: "" },
    ],
  });
};

const handleEducationChange = (index, field, value) => {
  const updatedEducation = [...formData.education];
  updatedEducation[index][field] = value;
  setFormData({ ...formData, education: updatedEducation });
};

  

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-start bg-gray-100 dark:bg-gray-900 p-6 pt-20">
      {/* Container for both sections */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left Section: Form (Scrollable) */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-xl overflow-y-auto" style={{ height: 'calc(100vh - 40px)' }}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create Your Resume</h2>

          {/* Personal Information */}
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Personal Information</h3>
          <div className="flex flex-col gap-4">
            {["firstName", "lastName", "jobTitle", "email", "phone"].map((field, index) => (
              <input
                key={index}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                required
                className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Location */}
          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Location</h3>
          <div className="flex flex-col gap-4">
            {["address", "city", "state", "country", "zipCode"].map((field, index) => (
              <input
                key={index}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Social Links */}
          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Website & Social Links</h3>
          <div className="flex flex-col gap-4">
            {["linkedin", "websiteLabel", "websiteURL", "github"].map((field, index) => (
              <input
                key={index}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Professional Summary */}
          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Professional Summary</h3>
          <div className="flex flex-col gap-4">
            {formData.summaryPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="Enter summary point"
                  value={point}
                  onChange={(e) => handleSummaryChange(index, e.target.value)}
                  className="input-field w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => removeSummaryPoint(index)} className="text-red-600 hover:text-red-800">
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={addSummaryPoint} className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center">
              <FaPlus className="mr-2" /> Add Point
            </button>
          </div>

          {/* Work Experience */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-800 dark:text-gray-200 cursor-pointer" onClick={() => setShowWorkExperience(!showWorkExperience)}>
              Work Experience {showWorkExperience ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {showWorkExperience && workExperience.map((exp, index) => (
              <div key={index} className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm flex flex-col gap-4 bg-gray-100 dark:bg-gray-700">
                <input type="text" placeholder="Company Name" className="input-field" value={exp.company} onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)} />
                <input type="text" placeholder="Job Title" className="input-field" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(index, "jobTitle", e.target.value)} />
                <div className="flex gap-4">
                  <input type="text" placeholder="City" className="input-field" value={exp.city} onChange={(e) => handleWorkExperienceChange(index, "city", e.target.value)} />
                  <input type="text" placeholder="State" className="input-field" value={exp.state} onChange={(e) => handleWorkExperienceChange(index, "state", e.target.value)} />
                  <input type="text" placeholder="Country" className="input-field" value={exp.country} onChange={(e) => handleWorkExperienceChange(index, "country", e.target.value)} />
                </div>
                <div className="flex gap-4">
                  <input type="month" placeholder="Start Date" className="input-field" value={`${exp.startYear}-${exp.startMonth}`} onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)} />
                  <input type="month" placeholder="End Date" className="input-field" value={`${exp.endYear}-${exp.endMonth}`} onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)} />
                </div>
                {exp.responsibilities.map((responsibility, responsibilityIndex) => (
                  <div key={responsibilityIndex} className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Responsibility"
                      value={responsibility}
                      onChange={(e) => handleResponsibilityChange(index, responsibilityIndex, e.target.value)}
                      className="input-field w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={() => {
                      const updatedExperience = [...workExperience];
                      updatedExperience[index].responsibilities.splice(responsibilityIndex, 1);
                      setWorkExperience(updatedExperience);
                    }} className="text-red-600 hover:text-red-800 p-2">X</button>
                  </div>
                ))}
                <button type="button" onClick={() => addResponsibility(index)} className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center">
                  <FaPlus className="mr-2" /> Add Responsibility
                </button>
              </div>
            ))}
            {showWorkExperience && <button type="button" onClick={addWorkExperience} className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center"><FaPlus className="mr-2" /> Add Work Experience</button>}
          </div>

         
          {/* Personal Projects */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-800 dark:text-gray-200 cursor-pointer" onClick={() => setShowPersonalProjects(!showPersonalProjects)}>
              Personal Projects {showPersonalProjects ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {showPersonalProjects && personalProjects.map((project, index) => (
              <div key={index} className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm flex flex-col gap-4 bg-gray-100 dark:bg-gray-700">
                <input type="text" placeholder="Project Name" className="input-field" value={project.projectName} onChange={(e) => handlePersonalProjectChange(index, "projectName", e.target.value)} />

                {/* Start and End Date */}
                <div className="flex gap-4">
                  <input type="month" placeholder="Start Date" className="input-field" value={`${project.startYear}-${project.startMonth}`} onChange={(e) => handlePersonalProjectChange(index, "startDate", e.target.value)} />
                  <input type="month" placeholder="End Date" className="input-field" value={`${project.endYear}-${project.endMonth}`} onChange={(e) => handlePersonalProjectChange(index, "endDate", e.target.value)} />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  {project.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        placeholder="Description"
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                        className="input-field w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button type="button" onClick={() => removeDescriptionPoint(index, descIndex)} className="text-red-600 hover:text-red-800 p-2">X</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addDescriptionPoint(index)} className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center">
                    <FaPlus className="mr-2" /> Add Description Point
                  </button>
                </div>

                {/* URLs */}
                <div className="flex gap-4 mt-4">
                  <input
                    type="url"
                    placeholder="Project URL"
                    className="input-field"
                    value={project.url}
                    onChange={(e) => handlePersonalProjectChange(index, "url", e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    className="input-field"
                    value={project.github}
                    onChange={(e) => handlePersonalProjectChange(index, "github", e.target.value)}
                  />
                </div>
              </div>
            ))}
            {showPersonalProjects && <button type="button" onClick={addPersonalProject} className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center"><FaPlus className="mr-2" /> Add Personal Project</button>}
          </div>

          {/* Skills Section */}
<h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Skills</h3>
<div className="flex flex-col gap-4">
  {["programmingLanguages", "developmentFrameworks", "versionControl", "databaseManagement", "ideAndTools"].map((category, index) => (
    <div key={index}>
      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
      {formData.skills[category].map((skill, skillIndex) => (
        <div key={skillIndex} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Enter ${category}`}
            value={skill}
            onChange={(e) => handleSkillsChange(category, skillIndex, e.target.value)}
            className="input-field bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeSkill(category, skillIndex)}
            className="text-red-600 hover:text-red-800 p-2"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addSkill(category)}
        className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center"
      >
        <FaPlus className="mr-2" /> Add {category.replace(/([A-Z])/g, ' $1')}
      </button>
    </div>
  ))}
</div>

{/* Education Section */}
<h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">Education</h3>
<div className="flex flex-col gap-4">
  {formData.education.map((edu, index) => (
    <div key={index} className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm flex flex-col gap-4 bg-gray-100 dark:bg-gray-700">
      <input
        type="text"
        placeholder="Degree"
        value={edu.degree}
        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Institution"
        value={edu.institution}
        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
        className="input-field"
      />
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Start Year"
          value={edu.startYear}
          onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="End Year"
          value={edu.endYear}
          onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
          className="input-field"
        />
      </div>
      <input
        type="text"
        placeholder="Location"
        value={edu.location}
        onChange={(e) => handleEducationChange(index, "location", e.target.value)}
        className="input-field"
      />
    </div>
  ))}
  <button
    type="button"
    onClick={addEducation}
    className="w-full bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition mt-4 flex items-center justify-center"
  >
    <FaPlus className="mr-2" /> Add Education
  </button>
</div>

        </form>

        {/* Right Section: Resume Template (Sticky) */}
        <div className="lg:w-1/2 w-full px-8 py-4 mt-0 lg:mt-0 flex-grow sticky top-0" style={{ height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-300 dark:border-gray-700">
              {/* Name & Position */}
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">{formData.jobTitle}</p>

              {/* Contact Information */}
              <div className="mt-4 flex flex-wrap justify-center gap-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{formData.phone}</span>
                </div>
                <a href="#" className="flex items-center text-blue-500">
                  <Linkedin className="w-5 h-5 mr-2" />
                  {formData.linkedin}
                </a>
                <a href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                  <Github className="w-5 h-5 mr-2" />
                  {formData.github}
                </a>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Summary</h2>
              <ul className="text-gray-600 dark:text-gray-300">
                {formData.summaryPoints.map((point, index) => (
                  <li key={index} className="list-disc ml-6">{point}</li>
                ))}
              </ul>

              {/* Work Experience */}
              <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Experience</h2>
              {workExperience.map((exp, index) => (
                <div key={index} className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{exp.jobTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company} | {exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</p>
                  <p className="text-gray-600 dark:text-gray-300">{exp.city}, {exp.state}, {exp.country}</p>
                  <ul className="list-disc ml-6">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}

             {/* Personal Projects */}
             <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Projects</h2>
              {personalProjects.map((project, index) => (
                <div key={index} className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{project.projectName}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.startMonth} {project.startYear} - {project.endMonth} {project.endYear}</p>
                  <ul className="list-disc ml-6">
                    {project.description.map((desc, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">{desc}</li>
                    ))}
                  </ul>
                  {project.github && (
                    <a href={project.github} className="flex items-center text-gray-700 dark:text-gray-300 mt-2">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  )}
                  {project.url && (
                    <a href={project.url} className="flex items-center text-blue-500 mt-2">
                      <Link className="w-5 h-5 mr-2" />
                      Project URL
                    </a>
                  )}
                </div>
              ))}


              {/* Skills Section */}
<div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>
<h2 className="text-xl font-semibold text-gray-800 dark:text-white">Skills</h2>
{Object.entries(formData.skills).map(([category, skills]) => (
  <div key={category}>
    <h3 className="font-semibold text-gray-700 dark:text-gray-200">{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
    <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
))}

{/* Education Section */}
<div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>
<h2 className="text-xl font-semibold text-gray-800 dark:text-white">Education</h2>
{formData.education.map((edu, index) => (
  <div key={index} className="mt-3">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{edu.degree}</h3>
    <p className="text-gray-600 dark:text-gray-300">{edu.institution} | {edu.startYear} - {edu.endYear}</p>
    <p className="text-gray-600 dark:text-gray-300">{edu.location}</p>
  </div>
))}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
