import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { Disc3, X } from "lucide-react";

// Backend mapping for ministries (frontend to backend enum)
const ministryMap = {
  CHOIR: "CHOIR",
  EVANGELISM: "EVANGELISM",
  "PRAYER WARRIOR": "PRAYER_WARRIOR",
  USHERS: "USHERS",
  "SUNDAY TEACHERS": "SUNDAY_TEACHERS",
  MEDIA: "MEDIA",
  WELFARE: "WELFARE",
  OTHER: "OTHER",
};

// Frontend display list
const ministryOptions = Object.keys(ministryMap);

const Step5SkillsInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    ministries: formData.ministries || [],
    reasonForNonParticipation: formData.reasonForNonParticipation || "",
    leadershipRole: formData.leadershipRole || "",
    skillsTalents: formData.skillsTalents || [],
    spiritualGifts: formData.spiritualGifts || [],
  });

  // Handle ministry checkbox toggle
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setLocalData((prev) => ({
      ...prev,
      ministries: checked
        ? [...prev.ministries, value]
        : prev.ministries.filter((item) => item !== value),
    }));
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // Add item to array fields (skillsTalents / spiritualGifts)
  const handleAddItem = (field, value) => {
    if (value.trim() && !localData[field].includes(value.trim())) {
      setLocalData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  // Remove item from array fields
  const handleRemoveItem = (field, item) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: prev[field].filter((i) => i !== item),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map ministries to backend enums
    const mappedMinistries = localData.ministries.map((item) => ministryMap[item]);

    updateForm({
      ...localData,
      ministries: mappedMinistries,
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
          <Disc3 className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-semibold mb-1">
            Ministry Involvement & Skills <span className="text-gray-500 text-sm">• 5/7</span>
          </h2>
        </div>
        <p className="text-gray-600 mb-6">
          Helps in identifying engaged members, potential volunteers, and leadership pipeline.
        </p>

        {/* Ministry Checkboxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {ministryOptions.map((ministry) => (
            <label key={ministry} className="flex items-center space-x-2">
              <input
                name="ministries"
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
          <label className="block text-sm font-medium mb-1">
            Reason for Non-Participation
          </label>
          <textarea
            name="reasonForNonParticipation"
            value={localData.reasonForNonParticipation}
            onChange={handleChange}
            placeholder="Please type here"
            maxLength={150}
            className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <p className="text-sm text-gray-400 text-right">{localData.reasonForNonParticipation.length}/150</p>
        </div>

        {/* Leadership Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Leadership Role (optional)
          </label>
          <input
            type="text"
            name="leadershipRole"
            value={localData.leadershipRole}
            onChange={handleChange}
            placeholder="Please type here"
            className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills / Talents */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Skills / Talents<span className="text-red-600">*</span>
          </label>
          <TagInput
            name="skillsTalents"
            items={localData.skillsTalents}
            onAdd={(val) => handleAddItem("skillsTalents", val)}
            onRemove={(item) => handleRemoveItem("skillsTalents", item)}
            placeholder="Type a skill and press Enter"
          />
        </div>

        {/* Spiritual Gifts */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Spiritual Gifts (optional)
          </label>
          <TagInput
          name="spiritualGifts"
            items={localData.spiritualGifts}
            onAdd={(val) => handleAddItem("spiritualGifts", val)}
            onRemove={(item) => handleRemoveItem("spiritualGifts", item)}
            placeholder="Type a gift and press Enter"
          />
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
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => updateForm(localData)}
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
        </div>
      </form>
    </>
  );
};

// TagInput reusable component
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
            <X className="w-3 h-3" />
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

export default Step5SkillsInfo;
