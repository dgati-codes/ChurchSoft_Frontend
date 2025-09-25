// components/registration/Step4EducationInfo.jsx
import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";
import { GraduationCap } from 'lucide-react';


const Step4EducationInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    educationLevel: formData.educationLevel || '',
    EmploymentType: formData.EmploymentType || '',
    EmploymentSector: formData.EmploymentSector || '',
    Profession: formData.Profession || '',
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

    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <div className=' flex gap-3'>
      <GraduationCap className='w-8 h-8 text-amber-500' />
      <h2 className="text-2xl  font-semibold mb-1">Education & Occupation <span className="text-gray-500 text-sm">• 4/7</span></h2>
      </div>
      <p className="text-gray-600  mb-6">Provides insight into educational background and professional network.


</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label htmlFor="educationLevel" className='text-gray-600 font-semibold'>Education Level<span className='text-red-600'>*</span></label>
          <select name="educationLevel" value={localData.educationLevel} onChange={handleChange} className="input">
          <option value="">Select Education Level</option>
          <option>None</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Tertiary</option>
          <option>Diploma</option>
          <option>Bachelor's Degree</option>
          <option>Master's Degree</option>
          <option>PhD</option>
          <option>Other</option>
        </select>
        </div>
        <div>
          <label htmlFor="Profession" className='text-gray-600 font-semibold'>Current Occupation/Profession<span className='text-red-600'>*</span></label>
         <input
         type='text'
          name="Profession"
          value={localData.Profession}
          onChange={handleChange}
          placeholder="Enter your occupation "
          className="input"
        />
        </div>
        

        <div>
          <label htmlFor="EmploymentSector" className='text-gray-600 font-semibold'>Employment Sector<span className='text-red-600'>*</span></label>
          <select name="EmploymentSector" onChange={handleChange} value={localData.EmploymentSector} className='input'>
            <option value="">Select Employment Sector</option>
            <option>Private Sector</option>
            <option>Public Sector</option>
            <option>Self-Employed</option>
            <option>Unemployed</option>
            <option>Other</option>
          </select>
          </div>
         <div>
           <label className='text-gray-600 font-semibold' htmlFor="EmploymentType">Employment Type<span className='text-red-600'>*</span></label>
        <input
          type="text"
          name="EmploymentType"
          value={localData.EmploymentType}
          onChange={handleChange}
          placeholder="Enter your Employment Type"
          className="input"
        />
         </div>

       
      </div>

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
          Back
        </button>
        <button
            type="submit"
            className="px-6 py-2 bg-white text-blue-500 rounded border border-blue-500 "
          >
           Save and Exit
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
