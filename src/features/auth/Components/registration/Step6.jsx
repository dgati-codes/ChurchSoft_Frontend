import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { Shield } from "lucide-react";

// 🔹 Constant options
const yesNoOptions = ["YES", "NO"];

const Step6HealthWelfareInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    hasHealthIssues: formData.hasHealthIssues || false,
    specialNeedsOrMedicalConditions: formData.specialNeedsOrMedicalConditions || "",
    leadershipRole: formData.leadershipRole || "",
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle yes/no toggle for health issues
  const handleHealthToggle = (value) => {
    setLocalData((prev) => ({
      ...prev,
      hasHealthIssues: value === "YES",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  const handleSaveExit = (e) => {
    e.preventDefault();
    updateForm(localData);
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
          Supports pastoral care, welfare interventions, and emergency preparedness.
        </p>

        {/* Health Condition */}
        <div className="space-y-2">
          <label className="font-medium text-gray-800">Any health condition(s)?</label>
          <div className="flex gap-6 mt-1">
            {yesNoOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasHealthIssues"
                  checked={localData.hasHealthIssues === (option === "YES")}
                  onChange={() => handleHealthToggle(option)}
                  className="w-4 h-4 border-gray-300 rounded"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Special Needs / Medical Conditions */}
        <div className="space-y-2 mt-4">
          <label className="font-medium text-gray-800">
            Special Needs or Medical Conditions
          </label>
          <p className="text-xs text-orange-500 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Optional and Confidential
          </p>
          <textarea
            name="specialNeedsOrMedicalConditions"
            placeholder="Please describe any special needs or medical conditions"
            value={localData.specialNeedsOrMedicalConditions}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        {/* Leadership Role */}
        <div className="space-y-2 mt-4">
          <label className="font-medium text-gray-800">Leadership Role (optional)</label>
          <input
            type="text"
            name="leadershipRole"
            value={localData.leadershipRole}
            onChange={handleChange}
            placeholder="Please type here"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Buttons */}
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
