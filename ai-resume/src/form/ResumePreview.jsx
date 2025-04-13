import React from "react";

const ResumePreview = ({ formData, workExperience, personalProjects }) => {
    console.log(formData);
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {formData.firstName} {formData.lastName}
        </h1>
        <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{formData.jobTitle}</p>
        <div className="mt-2 text-sm space-y-1">
          <p>{formData.email} | {formData.phone}</p>
          <p>{formData.city}, {formData.state}, {formData.country}</p>
          {formData.linkedin && <p>LinkedIn: <a href={formData.linkedin} className="text-blue-500 hover:underline">{formData.linkedin}</a></p>}
          {formData.github && <p>GitHub: <a href={formData.github} className="text-blue-500 hover:underline">{formData.github}</a></p>}
          {formData.websiteURL && <p>Website: <a href={formData.websiteURL} className="text-blue-500 hover:underline">{formData.websiteURL}</a></p>}
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Professional Summary</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {formData.summaryPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Work Experience</h2>
        {workExperience.map((job, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-bold">{job.jobTitle} @ {job.company}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {job.city}, {job.country} | {job.startMonth}/{job.startYear} – {job.endMonth}/{job.endYear}
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Projects</h2>
        {personalProjects.map((proj, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-bold">{proj.projectName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {proj.startMonth}/{proj.startYear} – {proj.endMonth}/{proj.endYear}
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              {proj.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            {proj.url && <p className="text-blue-600 text-sm">Live: <a href={proj.url}>{proj.url}</a></p>}
            {proj.github && <p className="text-blue-600 text-sm">GitHub: <a href={proj.github}>{proj.github}</a></p>}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Skills</h2>
        {Object.keys(formData.skills).map((category) => {
          const skillsArray = formData.skills[category].filter(Boolean);
          if (skillsArray.length === 0) return null;

          const readableCategory = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return (
            <div key={category} className="mb-2">
              <h4 className="text-sm font-semibold">{readableCategory}</h4>
              <p className="text-sm">{skillsArray.join(", ")}</p>
            </div>
          );
        })}
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Education</h2>
        {formData.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{edu.degree}</p>
            <p className="text-sm">{edu.institution} | {edu.startYear} – {edu.endYear}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{edu.location}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumePreview;
