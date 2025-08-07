// components/registration/Step4EducationInfo.jsx
import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";

const Step4EducationInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    educationLevel: formData.educationLevel || '',
    courseOfStudy: formData.courseOfStudy || '',
    institution: formData.institution || '',
    graduationYear: formData.graduationYear || '',
    professionalQualification: formData.professionalQualification || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  return (
    <>
    <h1 className='text-3xl flex justify-center font-semibold mb-1'>Church Member Registration</h1>
 <p className='flex justify-center pb-6'>Please fill out all sections to complete your membership registration</p>

    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl  font-semibold mb-1">Education & Occupation <span className='text-blue-600'>4/7</span></h2>
      <p className="text-gray-600  mb-6">Provides insight into educational background and professional network.


</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="educationLevel" value={localData.educationLevel} onChange={handleChange} className="input">
          <option value="">Select Education Level</option>
          <option>None</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Diploma</option>
          <option>Bachelor's Degree</option>
          <option>Master's Degree</option>
          <option>PhD</option>
          <option>Other</option>
        </select>

        <input
          name="courseOfStudy"
          value={localData.courseOfStudy}
          onChange={handleChange}
          placeholder="Course of Study"
          className="input"
        />

        <input
          name="institution"
          value={localData.institution}
          onChange={handleChange}
          placeholder="Institution Attended"
          className="input"
        />

        <input
          type="number"
          name="graduationYear"
          value={localData.graduationYear}
          onChange={handleChange}
          placeholder="Year of Graduation"
          className="input"
        />

        <input
          name="professionalQualification"
          value={localData.professionalQualification}
          onChange={handleChange}
          placeholder="Professional Qualification(s)"
          className="input"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
          Back
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Save and Continue
        </button>
      </div>
    </form>
    </>
  );
};

export default Step4EducationInfo;
