import { useState } from "react";

import { User } from "lucide-react";
import InputField from "../../../modals/InputField";
import { useRegistration } from "../../registration-context/RegistrationContext";

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

  // Generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  // Special mapped fields
  const handleGenderChange = (e) =>
    updateForm({ gender: genderMap[e.target.value] || "" });
  const handleMaritalStatusChange = (e) =>
    updateForm({ maritalStatus: maritalStatusMap[e.target.value] || "" });
  const handleIdTypeChange = (e) =>
    updateForm({ identificationType: idTypeMap[e.target.value] || "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure preferredLanguages is always an array
    updateForm({
      preferredLanguages: Array.isArray(formData.preferredLanguages)
        ? formData.preferredLanguages
        : [],
    });

    nextStep();
  };
  return (
    <>
      <h1 className="text-xl font-[DM Sans] flex justify-center font-semibold mb-1">
        Church Member Registration
      </h1>
      <p className="flex justify-center pb-6">
        Please fill out all sections to complete your membership registration
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl font-[DM Sans] mx-auto px-6 py-10 bg-white shadow-md rounded-lg"
      >
        <div className="mb-6 flex gap-3">
          <User className="w-8 h-8 text-fuchsia-500" />
          <h2 className="text-2xl font-semibold mb-1">
            Personal & Identity Information{" "}
            <span className="text-xl text-gray-400">• 1/7</span>
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Basic demographic and identification data to help uniquely recognize
          members.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FULL NAME */}
          <div>
            <InputField
              name="fullName"
              label="Full Name"
              value={formData.fullName || ""}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <InputField
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
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
                  (key) => genderMap[key] === formData.gender,
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
                  (key) => maritalStatusMap[key] === formData.maritalStatus,
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
            <InputField
              name="hometown"
              label="Hometown"
              value={formData.hometown || ""}
              onChange={handleChange}
              placeholder="Hometown"
              required
            />
          </div>

          {/* DISTRICT */}
          <div>
            <InputField
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              label="District"
              placeholder="District"
            />
          </div>
          {/* jurisdiction */}
          <div>
            <InputField
              name="jurisdiction"
              label="Region"
              value={formData.jurisdiction || ""}
              onChange={handleChange}
              placeholder="Region"
            />
          </div>

          {/* ASSEMBLY */}
          <div>
            <InputField
              name="assembly"
              label="Assembly"
              value={formData.assembly || ""}
              onChange={handleChange}
              className="input"
              placeholder="Assembly"
            />
          </div>

          {/* NATIONALITY */}
          <div>
            <InputField
              placeholder="Your Nationality"
              label="Nationality"
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* ETHNICITY */}
          <div>
            <InputField
              placeholder="Your Ethnicity"
              label="Ethnicity"
              name="ethnicity"
              value={formData.ethnicity || ""}
              onChange={handleChange}
              // required
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
                  (key) => idTypeMap[key] === formData.identificationType,
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
            <InputField
              placeholder="Your ID Number"
              label="ID Number"
              name="identificationNumber"
              value={formData.identificationNumber || ""}
              onChange={handleChange}
              className="input"
              // required
            />
          </div>

          {/* FATHER */}
          <div>
            <InputField
              placeholder="Father's Name"
              label="Father's Name"
              name="fathersName"
              value={formData.fathersName || ""}
              onChange={handleChange}
            />
          </div>

          {/* MOTHER */}
          <div>
            <InputField
              placeholder="Mother's Name"
              label="Mother's Name"
              name="mothersName"
              value={formData.mothersName || ""}
              onChange={handleChange}
            />
          </div>

          {/* MINISTRY AFFILIATION */}
          <div>
            <label className="text-gray-600 font-bold">
              Ministry Affiliation
            </label>
            <select
              name="ministryAffiliation"
              value={formData.ministryAffiliation || ""}
              onChange={handleChange}
              className="input"
              required
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
            <InputField
              type="text"
              label="Preferred Languages"
              placeholder="Enter language"
              className="input"
              // Join array into a string separated by comma and space
              value={formData.preferredLanguages?.join(", ") || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                const languagesArray = inputValue
                  .split(",") 
                  .map((l) => l.trim()) // trim spaces
                  .filter(Boolean); // remove empty strings

                updateForm({ preferredLanguages: languagesArray });
              }}
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
