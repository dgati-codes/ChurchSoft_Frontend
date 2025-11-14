import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { GraduationCap } from "lucide-react";

// Backend mappings
const educationLevelMap = {
  NONE: "NONE",
  BASIC: "BASIC",
  SHS: "SHS",
  TERTIARY: "TERTIARY",
  POSTGRADUATE: "POSTGRADUATE",
  OTHER: "OTHER",
};

const employmentTypeMap = {
  ARTISAN: "ARTISAN",
  TRADER: "TRADER",
  HEALTH_WORKER: "HEALTH_WORKER",
  TEACHER: "TEACHER",
  ENGINEER: "ENGINEER",
  ACCOUNTANT: "ACCOUNTANT",
  OTHER: "OTHER",
};

const employmentSectorMap = {
  PRIVATE: "PRIVATE",
  PUBLIC: "PUBLIC",
  SELF_EMPLOYED: "SELF_EMPLOYED",
  NGO: "NGO",
  STUDENT: "STUDENT",
  RETIRED: "RETIRED",
  UNEMPLOYED: "UNEMPLOYED",
  OTHERS: "OTHERS",
};

const Step4EducationInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    educationalLevel: formData.educationalLevel || "",
    occupation: formData.occupation || "",
    employmentSector: formData.employmentSector || "",
    employmentType: formData.employmentType || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm({
      educationalLevel: educationLevelMap[localData.educationalLevel] || "",
      occupation: localData.occupation,
      employmentSector: employmentSectorMap[localData.employmentSector] || "",
      employmentType: employmentTypeMap[localData.employmentType] || "",
    });

    nextStep();
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
        className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg"
      >
        <div className="flex gap-3 mb-4">
          <GraduationCap className="w-8 h-8 text-amber-500" />
          <h2 className="text-2xl font-semibold mb-1">
            Education & Occupation <span className="text-gray-500 text-sm">• 4/7</span>
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Provides insight into educational background, professional network, and ministry involvement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education Level */}
          <div>
            <label className="text-gray-600 font-semibold">
              Education Level<span className="text-red-600">*</span>
            </label>
            <select
              name="educationalLevel"
              value={localData.educationalLevel}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Education Level</option>
              {Object.keys(educationLevelMap).map((key) => (
                <option key={key} value={key}>
                  {key.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-gray-600 font-semibold">
              Occupation/Profession<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="occupation"
              value={localData.occupation}
              onChange={handleChange}
              placeholder="Enter your occupation"
              className="input"
              required
            />
          </div>

          {/* Employment Sector */}
          <div>
            <label className="text-gray-600 font-semibold">
              Employment Sector<span className="text-red-600">*</span>
            </label>
            <select
              name="employmentSector"
              value={localData.employmentSector}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Employment Sector</option>
              {Object.keys(employmentSectorMap).map((key) => (
                <option key={key} value={key}>
                  {key.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="text-gray-600 font-semibold">
              Employment Type<span className="text-red-600">*</span>
            </label>
            <select
              name="employmentType"
              value={localData.employmentType}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Employment Type</option>
              {Object.keys(employmentTypeMap).map((key) => (
                <option key={key} value={key}>
                  {key.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Back
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

export default Step4EducationInfo;
