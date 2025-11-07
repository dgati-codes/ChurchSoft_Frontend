import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";
import { Disc3 } from 'lucide-react';


const ministryOptions = [
  "Choir", "Evangelism", "Prayer Warrior",
  "Ushers", "Sunday Teachers", "Other"
];

const Step5SkillsInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    ministries: formData.ministries || [],
    reason: formData.reason || '',
    leadershipRole: formData.leadershipRole || '',
    skills: formData.skills || '',
    spiritualGifts: formData.spiritualGifts || '',
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedMinistries = checked
      ? [...localData.ministries, value]
      : localData.ministries.filter((item) => item !== value);

    setLocalData((prev) => ({ ...prev, ministries: updatedMinistries }));
  };

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
        <div className="mb-6 flex gap-3">
          <Disc3 className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-semibold mb-1">Ministry Involvement & Skills <span className="text-gray-500 text-sm">• 5/7</span></h2>
        </div>
        <p className="text-gray-600 mb-6">Helps in identifying engaged members, potential volunteers, and leadership pipeline.</p>

        {/* Ministry Checkboxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {ministryOptions.map((ministry) => (
            <label key={ministry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={ministry}
                checked={localData.ministries.includes(ministry)}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{ministry}</span>
            </label>
          ))}
        </div>

        {/* Reason for Non-Participation */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Reason for Non-Participation</label>
          <textarea
            name="reason"
            value={localData.reason}
            onChange={handleChange}
            placeholder="Please type here"
            maxLength={150}
            className="w-full  bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <p className="text-sm text-gray-400 text-right">{localData.reason.length}/150</p>
        </div>

        {/* Leadership Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Leadership Role (optional)</label>
          <input
            type="text"
            name="leadershipRole"
            value={localData.leadershipRole}
            onChange={handleChange}
            placeholder="Please type here"
            className="w-full  bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills & Gifts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skills / Talents*</label>
            <input
              type="text"
              name="skills"
              value={localData.skills}
              onChange={handleChange}
              placeholder="Enter your skill(s)"
              className="w-full  bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Spiritual Gifts (optional)</label>
            <input
              type="text"
              name="spiritualGifts"
              value={localData.spiritualGifts}
              onChange={handleChange}
              placeholder="Enter your gift(s)"
              className="w-full  bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-blue-500 rounded border border-blue-500 "
          >
           Save and Exit
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default Step5SkillsInfo;
