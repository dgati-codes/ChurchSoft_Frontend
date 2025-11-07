// components/registration/Step6HealthWelfareInfo.jsx
import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { Shield } from "lucide-react";

const Step6HealthWelfareInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  // Local form state initialized from global formData
  const [localData, setLocalData] = useState({
    healthCondition: formData.healthCondition || "",
    specialNeeds: formData.specialNeeds || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle checkbox-like yes/no state
  const handleHealthCondition = (value) => {
    setLocalData((prev) => ({
      ...prev,
      healthCondition: prev.healthCondition === value ? "" : value,
    }));
  };

  // Save & Continue
  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  // Save & Exit
  const handleSaveExit = (e) => {
    e.preventDefault();
    updateForm(localData);
    // Could add exit logic (redirect, toast, etc.)
  };

  return (
    <>
      <h1 className="text-3xl flex justify-center font-semibold mb-1">
        Church Member Registration
      </h1>
      <p className="flex justify-center pb-6">
        Please fill out all sections to complete your membership registration
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Welfare & Health Information
          </h2>
          <span className="text-sm text-gray-400 ml-2">• 6/7</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Supports pastoral care, welfare interventions, and emergency
          preparedness.
        </p>

        {/* Health Condition */}
        <div className="space-y-2">
          <label className="font-medium text-gray-800">
            Any health condition(s)?
          </label>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localData.healthCondition === "yes"}
                onChange={() => handleHealthCondition("yes")}
                className="w-4 h-4 border-gray-300 rounded"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localData.healthCondition === "no"}
                onChange={() => handleHealthCondition("no")}
                className="w-4 h-4 border-gray-300 rounded"
              />
              No
            </label>
          </div>
        </div>

        {/* Special Needs */}
        <div className="space-y-2 mt-4">
          <label className="font-medium text-gray-800">
            Any special needs or medical conditions
          </label>
          <p className="text-xs text-orange-500 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Optional and Confidential
          </p>
          <textarea
            name="specialNeeds"
            placeholder="Please describe any special needs or medical conditions"
            value={localData.specialNeeds}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Back
          </button>
         
            <button
              type="button"
              onClick={handleSaveExit}
              className="px-6 py-2 bg-white text-blue-500 rounded border border-blue-500"
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

export default Step6HealthWelfareInfo;
