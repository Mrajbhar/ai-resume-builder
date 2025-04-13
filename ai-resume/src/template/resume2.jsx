import React, { useState, useEffect } from 'react';

const Resume2 = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const templates = [
    {
      name: 'Experience',
      image: 'https://d.novoresume.com/images/doc/basic-resume-template.png',
      description: 'A clean and professional template designed for showcasing work experience.',
    },
    {
      name: 'Education',
      image: 'https://cdn.enhancv.com/predefined-examples/DuL0GzrjhjZHr0mwbwgPitMJ3Z20hVmYHQciz6rm/image.png',
      description: 'This template highlights educational background in an organized manner.',
    },
    {
      name: 'Skills',
      image: 'https://cdn.enhancv.com/predefined-examples/sUb4oq7059QBi30L2zjkFq9o0tWgRBkjkcpqb2Ia/image.png',
      description: 'Focused on skill-based formatting to emphasize professional capabilities.',
    },
    {
      name: 'SDE',
      image: 'https://cdn.enhancv.com/predefined-examples/S2qerVrErI0tvVZLKJOmqRRRSI0hFq6BfanE79qZ/image.png',
      description: 'A modern design highlighting your skills in a creative way.',
    },
    {
      name: 'SDE 2',
      image: 'https://cdn.enhancv.com/predefined-examples/S2qerVrErI0tvVZLKJOmqRRRSI0hFq6BfanE79qZ/image.png',
      description: 'A modern design highlighting your skills in a creative way.',
    },
    {
      name: 'SDE 3',
      image: 'https://cdn.enhancv.com/predefined-examples/ODZVlPZYcH19GrpQwczhgCJICeB1Y5zh81Pj1wVI/image.png',
      description: 'A modern design highlighting your skills in a creative way.',
    },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark'); // Add 'dark' class to the body for dark mode
    } else {
      document.body.classList.remove('dark'); // Remove 'dark' class for light mode
    }
  }, [isDarkMode]);

  const handleBoxClick = (templateName) => {
    setActiveBox(activeBox === templateName ? null : templateName);
  };

  const handleFullScreen = (template) => {
    setIsFullScreen(!isFullScreen);
    setActiveBox(template);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center py-12 px-6 sm:px-12 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 opacity-50 animate-pulse"></div>

      {/* Header */}
      <h1 className="text-3xl font-semibold text-white mb-8 relative z-10">Choose a Resume Template</h1>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700"
      >
        Toggle Dark Mode
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {/* Resume Template Boxes */}
        {templates.map((template, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(template.name)}
            className={`cursor-pointer p-4 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform 
                        ${activeBox === template.name ? 'scale-105 hover:scale-110 hover:opacity-90' : 'hover:scale-105 hover:opacity-90'} 
                        hover:bg-gray-200 dark:hover:bg-gray-800 hover:shadow-md hover:ring-2 hover:ring-gray-300 active:scale-100 active:shadow-inner`} // More neutral hover effect
          >
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={template.image}
                alt={`${template.name} Template`}
                className="w-full h-auto object-cover rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mt-3">{template.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs text-center mt-2">{template.description}</p>
          </div>
        ))}
      </div>

      {/* Full-Screen View for Template */}
      {isFullScreen && activeBox && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-20">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 max-w-xl w-full"> {/* Reduced width for smaller template */}
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">{activeBox}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{templates.find(t => t.name === activeBox).description}</p>
            </div>
            <img
              src={templates.find(t => t.name === activeBox).image}
              alt={`${activeBox} Template`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Footer / Notes Section */}
      <div className="text-center mt-8 relative z-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm">Select a template to explore more details.</p>
      </div>
    </div>
  );
};

export default Resume2;
