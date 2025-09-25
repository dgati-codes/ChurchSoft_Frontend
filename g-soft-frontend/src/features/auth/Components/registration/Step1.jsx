
import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";
import { User } from 'lucide-react';


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

    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <div className='mb-6 flex gap-3'>
        <User className='w-8 h-8 text-fuchsia-500'/>
        <h2 className="text-2xl  font-semibold mb-1"> Personal & Identity Information <span className=' text-xl text-gray-400'>• 1/7</span></h2> 
      </div>
      <p className="text-gray-600  mb-6">Basic demographic and identification data to help uniquely recognize and segment members.

</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className='text-gray-600 font-bold'> Full Name<span className='text-red-600'>*</span></label>
        <input name="fullName" value={localData.fullName} onChange={handleChange} placeholder="Full Name*" className="input" /> 
        </div>
        <div>
          <label htmlFor="dob" className='text-gray-600 font-bold'>Date of Birth<span className='text-red-600'>*</span></label>
        <input type="date" name="dob" value={localData.dob} onChange={handleChange} className="input " placeholder="Date of Birth*" />
        </div>
        <div>
          <label htmlFor="gender" className='text-gray-600 font-bold'>Gender<span className='text-red-600'>*</span></label>
        <select name="gender" value={localData.gender} onChange={handleChange} className="input">          
          <option value="">Select your gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        </div>
        <div>
          <label htmlFor="maritalStatus" className='text-gray-600 font-bold'>Marital <span className='text-red-600'>*</span></label>
        <select name="maritalStatus" value={localData.maritalStatus} onChange={handleChange} className="input">
          <option value="">Select marital status</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>
        </div>
        <div>
          <label htmlFor="hometown" className='text-gray-600 font-bold'>Hometown <span className='text-red-600'>*</span></label>
        <input name="hometown" value={localData.hometown} onChange={handleChange} placeholder="Hometown*" className="input" />
        </div>
        <div>
          <label htmlFor="nationality" className='text-gray-600 font-bold'>Nationality<span className='text-red-600'>*</span></label>
        <input name="nationality" value={localData.nationality} onChange={handleChange} placeholder="Nationality*" className="input" />
        </div>
        <div>
          <label htmlFor="ethnicity" className='text-gray-600 font-bold'>Ethnicity<span className='text-red-600'>*</span></label>
        <input name="ethnicity" value={localData.ethnicity} onChange={handleChange} placeholder="Ethnicity*" className="input" />
        </div>
       <div>
         <label htmlFor="idType" className='text-gray-600 font-bold'>Identification Type<span className='text-red-600'>*</span></label>
        <select name="idType" value={localData.idType} onChange={handleChange} className="input">
          <option value="">Select ID type</option>
          <option>National ID</option>
          <option>Passport</option>
          <option>Driver's License</option>
        </select>
       </div>
       <div>
        <label htmlFor="idNumber" className='text-gray-600 font-bold'>Identification Number<span className='text-red-600'>*</span></label>
        <input name="idNumber" value={localData.idNumber} onChange={handleChange} placeholder="Identification Number*" className="input" />
       </div>
       <div>
        <label htmlFor="fatherName" className='text-gray-600 font-bold'>Father’s Name<span className='text-red-600'>*</span></label>
        <input name="fatherName" value={localData.fatherName} onChange={handleChange} placeholder="Father’s Name*" className="input" />
       </div>
       <div>
        <label htmlFor="motherName" className='text-gray-600 font-bold'>Mother’s Name<span className='text-red-600'>*</span></label>
        <input name="motherName" value={localData.motherName} onChange={handleChange} placeholder="Mother’s Name*" className="input" />
       </div>
       <div>
        <label htmlFor="genderMinistry" className='text-gray-600 font-bold'>Gender Ministry Affiliation<span className='text-red-600'>*</span> </label>
        <select name="genderMinistry" value={localData.genderMinistry} onChange={handleChange} className="input">
          <option value="">Select ministry affiliation</option>
          <option>Men's Ministry</option>
          <option>Women's Ministry</option>
          <option>Youth Ministry</option>
        </select>
       </div>
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
