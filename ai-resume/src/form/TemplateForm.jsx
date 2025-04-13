import React, { useState, useEffect, lazy, Suspense } from 'react';
import ResumeForm from '../form/resumeform';

const templateComponents = {
  'Resume': lazy(() => import('../template/resume')),
  'Resume2': lazy(() => import('../template/resume2')),
  'Resume3': lazy(() => import('../form/ResumePreview')),
  'Resume4': lazy(() => import('../template/Resume4')),
};

const TemplateForm = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    linkedin: '',
    github: '',
    websiteURL: '',
    summaryPoints: [''],
    education: [],
    skills: {
      programmingLanguages: [],
      frameworks: [],
      tools: [],
    },
    workExperience: [],
    personalProjects: [],
  });

  const templates = [
    {
      name: 'Resume',
      image: 'https://d.novoresume.com/images/doc/basic-resume-template.png',
      description: 'Modern experience-first resume',
    },
    {
      name: 'Resume2',
      image: 'https://cdn.enhancv.com/predefined-examples/DuL0GzrjhjZHr0mwbwgPitMJ3Z20hVmYHQciz6rm/image.png',
      description: 'Education-centric layout',
    },
    {
      name: 'Resume3',
      image: 'https://cdn.enhancv.com/predefined-examples/sUb4oq7059QBi30L2zjkFq9o0tWgRBkjkcpqb2Ia/image.png',
      description: 'Skills focused',
    },
    {
      name: 'Resume4',
      image: 'https://cdn.enhancv.com/predefined-examples/S2qerVrErI0tvVZLKJOmqRRRSI0hFq6BfanE79qZ/image.png',
      description: 'Creative dev resume',
    },
  ];

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const SelectedTemplate = activeTemplate ? templateComponents[activeTemplate] : null;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-6 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-indigo-700 to-blue-600 opacity-30 z-0" />

      {/* Toggle Dark Mode */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 z-10"
      >
        Toggle Dark Mode
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-white relative z-10">
        {activeTemplate ? `Edit Template: ${activeTemplate}` : 'Select a Resume Template'}
      </h1>

      {/* Template Selection or Editor */}
      {!activeTemplate ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {templates.map((template, i) => (
            <div
              key={i}
              onClick={() => setActiveTemplate(template.name)}
              className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-xl"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                  {template.name}
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-y-auto max-h-[85vh]">
            <ResumeForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-y-auto max-h-[85vh]">
            <Suspense fallback={<div className="text-center text-white">Loading Preview...</div>}>
              {SelectedTemplate && (
                <SelectedTemplate
                  formData={formData}
                  workExperience={formData.workExperience}
                  personalProjects={formData.personalProjects}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}

      {/* Back Button */}
      {activeTemplate && (
        <div className="text-center mt-8 relative z-10">
          <button
            onClick={() => setActiveTemplate(null)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ← Back to Templates
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateForm;
