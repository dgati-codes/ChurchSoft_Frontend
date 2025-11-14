import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { User } from "lucide-react";

// ENUM maps (UI → Backend)
const genderMap = {
  Male: "MALE",
  Female: "FEMALE",
  Other: "OTHER",
};

const maritalStatusMap = {
  Single: "SINGLE",
  Married: "MARRIED",
  Divorced: "DIVORCED",
  Widowed: "WIDOWED",
};

const idTypeMap = {
  PASSPORT: "PASSPORT",
  NATIONAL_ID: "NATIONAL_ID",
  DRIVERS_LICENSE: "DRIVERS_LICENSE",
  VOTERS_ID: "VOTERS_ID",
  OTHER: "OTHER",
};

const Step1PersonalInfo = () => {
  const { formData, updateForm, nextStep } = useRegistration();

  const [localData, setLocalData] = useState({
    fullName: formData.fullName || "",
    dateOfBirth: formData.dateOfBirth || "",
    gender: formData.gender || "",
    maritalStatus: formData.maritalStatus || "",
    hometown: formData.hometown || "",
    district: formData.district || "",
    assembly: formData.assembly || "",
    nationality: formData.nationality || "",
    ethnicity: formData.ethnicity || "",
    identificationType: formData.identificationType || "",
    identificationNumber: formData.identificationNumber || "",
    fathersName: formData.fathersName || "",
    mothersName: formData.mothersName || "",
    ministryAffiliation: formData.ministryAffiliation || "",
    preferredLanguages: Array.isArray(formData.preferredLanguages)
      ? formData.preferredLanguages
      : [], // FIXED
  });

  // GENERIC HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // MAPPED FIELDS
  const handleGenderChange = (e) => {
    const backendValue = genderMap[e.target.value] || "";
    setLocalData((prev) => ({ ...prev, gender: backendValue }));
  };

  const handleMaritalStatusChange = (e) => {
    const backendValue = maritalStatusMap[e.target.value] || "";
    setLocalData((prev) => ({ ...prev, maritalStatus: backendValue }));
  };

  const handleIdTypeChange = (e) => {
    const backendValue = idTypeMap[e.target.value] || "";
    setLocalData((prev) => ({ ...prev, identificationType: backendValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 ENSURE preferredLanguages ALWAYS SAVES AS ARRAY
    const cleanedLanguages = [...localData.preferredLanguages];

    updateForm({
      ...localData,
      preferredLanguages: cleanedLanguages,
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
        <div className="mb-6 flex gap-3">
          <User className="w-8 h-8 text-fuchsia-500" />
          <h2 className="text-2xl font-semibold mb-1">
            Personal & Identity Information{" "}
            <span className="text-xl text-gray-400">• 1/7</span>
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Basic demographic and identification data to help uniquely recognize members.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FULL NAME */}
          <div>
            <label className="text-gray-600 font-bold">
              Full Name<span className="text-red-600">*</span>
            </label>
            <input
              name="fullName"
              value={localData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="input"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-gray-600 font-bold">
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={localData.dateOfBirth}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-gray-600 font-bold">
              Gender<span className="text-red-600">*</span>
            </label>
            <select
              name="gender"
              value={
                Object.keys(genderMap).find(
                  (key) => genderMap[key] === localData.gender
                ) || ""
              }
              onChange={handleGenderChange}
              className="input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
              <option value="Other">OTHER</option>
            </select>
          </div>

          {/* MARITAL STATUS */}
          <div>
            <label className="text-gray-600 font-bold">
              Marital Status<span className="text-red-600">*</span>
            </label>
            <select
              name="maritalStatus"
              value={
                Object.keys(maritalStatusMap).find(
                  (key) => maritalStatusMap[key] === localData.maritalStatus
                ) || ""
              }
              onChange={handleMaritalStatusChange}
              className="input"
              required
            >
              <option value="">Select Status</option>
              <option value="Single">SINGLE</option>
              <option value="Married">MARRIED</option>
              <option value="Divorced">DIVORCED</option>
              <option value="Widowed">WIDOWED</option>
            </select>
          </div>

          {/* HOMETOWN */}
          <div>
            <label className="text-gray-600 font-bold">
              Hometown<span className="text-red-600">*</span>
            </label>
            <input
              name="hometown"
              value={localData.hometown}
              onChange={handleChange}
              className="input"
              placeholder="Hometown"
              required
            />
          </div>

          {/* DISTRICT */}
          <div>
            <label className="text-gray-600 font-bold">District</label>
            <input
              name="district"
              value={localData.district}
              onChange={handleChange}
              className="input"
              placeholder="District"
            />
          </div>

          {/* ASSEMBLY */}
          <div>
            <label className="text-gray-600 font-bold">Assembly</label>
            <input
              name="assembly"
              value={localData.assembly}
              onChange={handleChange}
              className="input"
              placeholder="Assembly"
            />
          </div>

          {/* NATIONALITY */}
          <div>
            <label className="text-gray-600 font-bold">
              Nationality<span className="text-red-600">*</span>
            </label>
            <input
              name="nationality"
              value={localData.nationality}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* ETHNICITY */}
          <div>
            <label className="text-gray-600 font-bold">
              Ethnicity<span className="text-red-600">*</span>
            </label>
            <input
              name="ethnicity"
              value={localData.ethnicity}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* ID TYPE */}
          <div>
            <label className="text-gray-600 font-bold">
              Identification Type<span className="text-red-600">*</span>
            </label>
            <select
              name="identificationType"
              value={
                Object.keys(idTypeMap).find(
                  (key) => idTypeMap[key] === localData.identificationType
                ) || ""
              }
              onChange={handleIdTypeChange}
              className="input"
              required
            >
              <option value="">Select ID Type</option>
              <option value="PASSPORT">PASSPORT</option>
              <option value="NATIONAL_ID">NATIONAL ID</option>
              <option value="DRIVERS_LICENSE">DRIVER'S LICENSE</option>
              <option value="VOTERS_ID">VOTER'S ID</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          {/* ID NUMBER */}
          <div>
            <label className="text-gray-600 font-bold">
              Identification Number<span className="text-red-600">*</span>
            </label>
            <input
              name="identificationNumber"
              value={localData.identificationNumber}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* FATHER */}
          <div>
            <label className="text-gray-600 font-bold">Father's Name</label>
            <input
              name="fathersName"
              value={localData.fathersName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* MOTHER */}
          <div>
            <label className="text-gray-600 font-bold">Mother's Name</label>
            <input
              name="mothersName"
              value={localData.mothersName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* MINISTRY AFFILIATION */}
          <div>
            <label className="text-gray-600 font-bold">
              Ministry Affiliation
            </label>
            <select
              name="ministryAffiliation"
              value={localData.ministryAffiliation}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Ministry</option>
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="JUNIOR_YOUTH">JUNIOR YOUTH</option>
              <option value="SENIOR_YOUTH">SENIOR YOUTH</option>
              <option value="CHILDREN">CHILDREN</option>
            </select>
          </div>

          {/* PREFERRED LANGUAGES */}
          <div>
            <label className="text-gray-600 font-bold">Preferred Languages</label>
            <TagInput
              name="preferredLanguages"
              items={localData.preferredLanguages}
              onAdd={(val) =>
                val.trim() &&
                !localData.preferredLanguages.includes(val.trim()) &&
                setLocalData((prev) => ({
                  ...prev,
                  preferredLanguages: [...prev.preferredLanguages, val.trim()],
                }))
              }
              onRemove={(item) =>
                setLocalData((prev) => ({
                  ...prev,
                  preferredLanguages: prev.preferredLanguages.filter(
                    (i) => i !== item
                  ),
                }))
              }
              placeholder="Type a language and press Enter"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
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

// 🔹 Reusable TagInput component
const TagInput = ({ items, onAdd, onRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="bg-gray-100 rounded p-2 flex flex-wrap gap-2 border border-gray-200">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
        >
          {item}
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="ml-1 text-blue-500 hover:text-blue-700"
          >
            &times;
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
};

export default Step1PersonalInfo;
