// components/registration/Step6HealthWelfareInfo.jsx
import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";

const Step6HealthWelfareInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    emergencyContactName: formData.emergencyContactName || '',
    emergencyContactPhone: formData.emergencyContactPhone || '',
    relationshipToEmergency: formData.relationshipToEmergency || '',
    healthCondition: formData.healthCondition || '',
    allergies: formData.allergies || '',
    disabilityStatus: formData.disabilityStatus || '',
    healthInsuranceProvider: formData.healthInsuranceProvider || '',
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
      <h2 className="text-2xl  font-semibold mb-1">Welfare & Health Information <span className='text-blue-600'>6/7</span></h2>
      <p className="text-gray-600  mb-6">Supports pastoral care, welfare interventions, and emergency preparedness.
</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="emergencyContactName"
          value={localData.emergencyContactName}
          onChange={handleChange}
          placeholder="Emergency Contact Name*"
          className="input"
        />

        <input
          name="emergencyContactPhone"
          value={localData.emergencyContactPhone}
          onChange={handleChange}
          placeholder="Emergency Contact Phone*"
          className="input"
        />

        <input
          name="relationshipToEmergency"
          value={localData.relationshipToEmergency}
          onChange={handleChange}
          placeholder="Relationship to Emergency Contact"
          className="input"
        />

        <input
          name="healthCondition"
          value={localData.healthCondition}
          onChange={handleChange}
          placeholder="Health Condition(s) (if any)"
          className="input"
        />

        <input
          name="allergies"
          value={localData.allergies}
          onChange={handleChange}
          placeholder="Allergies (if any)"
          className="input"
        />

        <select
          name="disabilityStatus"
          value={localData.disabilityStatus}
          onChange={handleChange}
          className="input"
        >
          <option value="">Do you have a disability?</option>
          <option>None</option>
          <option>Yes - Physical</option>
          <option>Yes - Visual</option>
          <option>Yes - Hearing</option>
          <option>Other</option>
        </select>

        <input
          name="healthInsuranceProvider"
          value={localData.healthInsuranceProvider}
          onChange={handleChange}
          placeholder="Health Insurance Provider"
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

export default Step6HealthWelfareInfo;
