
import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";

const Step1PersonalInfo = () => {
  const { formData, updateForm, nextStep } = useRegistration();
  const [localData, setLocalData] = useState(formData);

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
      <h2 className="text-2xl  font-semibold mb-1">Personal & Identity Information <span className='text-blue-600'>1/7</span></h2>
      <p className="text-gray-600  mb-6">Basic demographic and identification data to help uniquely recognize and segment members.

</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="fullName" value={localData.fullName} onChange={handleChange} placeholder="Full Name*" className="input" />
        <input type="date" name="dob" value={localData.dob} onChange={handleChange} className="input" placeholder="Date of Birth*" />
        <select name="gender" value={localData.gender} onChange={handleChange} className="input">
          <option value="">Select your gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select name="maritalStatus" value={localData.maritalStatus} onChange={handleChange} className="input">
          <option value="">Select marital status</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>
        <input name="hometown" value={localData.hometown} onChange={handleChange} placeholder="Hometown*" className="input" />
        <input name="nationality" value={localData.nationality} onChange={handleChange} placeholder="Nationality*" className="input" />
        <input name="ethnicity" value={localData.ethnicity} onChange={handleChange} placeholder="Ethnicity*" className="input" />
        <select name="idType" value={localData.idType} onChange={handleChange} className="input">
          <option value="">Select ID type</option>
          <option>National ID</option>
          <option>Passport</option>
          <option>Driver's License</option>
        </select>
        <input name="idNumber" value={localData.idNumber} onChange={handleChange} placeholder="Identification Number*" className="input" />
        <input name="fatherName" value={localData.fatherName} onChange={handleChange} placeholder="Father’s Name*" className="input" />
        <input name="motherName" value={localData.motherName} onChange={handleChange} placeholder="Mother’s Name*" className="input" />
        <select name="genderMinistry" value={localData.genderMinistry} onChange={handleChange} className="input">
          <option value="">Select ministry affiliation</option>
          <option>Men's Ministry</option>
          <option>Women's Ministry</option>
          <option>Youth Ministry</option>
        </select>
      </div>

      <div className="mt-6 text-right">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Save and Continue
        </button>
      </div>
    </form>
    </>
  );
};

export default Step1PersonalInfo;
