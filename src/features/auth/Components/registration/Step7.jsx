import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { User, MapPin, Church, Book, Star, HeartPulse, Pencil, Save, X } from "lucide-react";
import memberService from "../../../../api/memberService";
import { useQueryClient } from "@tanstack/react-query";

// ✅ use service instead of axios

const Step7ReviewSubmit = () => {
  const { formData, updateForm, resetForm } = useRegistration();
  const [editingSection, setEditingSection] = useState(null);
  const [localData, setLocalData] = useState(formData);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle field changes (including arrays)
 const handleFieldChange = (key, value, subObject = null) => {
  const isArrayField =
    ["skillsTalents", "spiritualGifts", "ministries", "preferredLanguages"].includes(key);

  const finalValue = isArrayField
    ? typeof value === "string"
      ? value.split(",").map((v) => v.trim()).filter(Boolean)
      : Array.isArray(value)
      ? value
      : []
    : value;

  if (subObject) {
    setLocalData((prev) => ({
      ...prev,
      [subObject]: { ...prev[subObject], [key]: finalValue },
    }));
  } else {
    setLocalData((prev) => ({ ...prev, [key]: finalValue }));
  }
};


  // 🔹 Save section edits
  const handleSave = () => {
    updateForm(localData);
    setEditingSection(null);
  };

  // 🔹 Final submit using memberService
  const queryClient = useQueryClient();

  const handleFinalSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Normalize booleans
    localData.hasHealthIssues =
      localData.hasHealthIssues === "YES" || localData.hasHealthIssues === true;

    localData.healthCondition =
      localData.healthCondition === "YES" || localData.healthCondition === true;

    // Ensure arrays exist
    ["skillsTalents", "spiritualGifts", "ministries", "preferredLanguages"].forEach(
      (field) => {
        if (!Array.isArray(localData[field])) localData[field] = [];
      }
    );

    // Remove empty strings
    Object.keys(localData).forEach(
      (key) => localData[key] === "" && (localData[key] = null)
    );

    // ✅ Create member via API
    const newMember = await memberService.createMember(localData);

    // ✅ Update React Query cache so new member appears on top
    queryClient.setQueryData(["members"], (old = []) => [newMember, ...old]);

    alert("Registration successful!");
    resetForm(); // optional: reset registration form
  } catch (error) {
    console.error(error);
    alert("Submission failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  // 🔹 Sections definition (unchanged)
  const sections = [
    {
      title: "Personal & Identity Information",
      icon: <User className="w-5 h-5 text-white" />,
      fields: [
        "fullName",
        "dateOfBirth",
        "gender",
        "maritalStatus",
        "hometown",
        "jurisdiction",
        "district",
        "assembly",
        "nationality",
        "ethnicity",
        "identificationType",
        "identificationNumber",
        "fathersName",
        "mothersName",
        "ministryAffiliation",
        "consentForCommunication",
        "preferredLanguages",
       
      ],
    },
    {
      title: "Contact & Location Details",
      icon: <MapPin className="w-5 h-5 text-white" />,
      fields: ["phoneNumber", "email", "whatsappAvailable", "residentialAddress"],
      subTitle: "Next of Kin Details",
      subFields: ["name", "relationship", "contactInformation"],
      subObject: "nextOfKin",
    },
    {
      title: "Spiritual Journey & Church Membership",
      icon: <Church className="w-5 h-5 text-white" />,
      fields: [
        "status",
        "baptismStatus",
        "baptismDate",
        "baptismLocation",
        "baptismType",
        "dateJoinedChurch",
        "firstVisitDate",
        "invitedBy",
        "fellowshipGroup",
        "salvationStatus",
        "churchExperienceRating",
      ],
    },
    {
      title: "Education & Career Details",
      icon: <Book className="w-5 h-5 text-white" />,
      fields: ["educationalLevel", "occupation", "employmentSector", "employmentType"],
    },
    {
      title: "Ministry Involvement & Skills",
      icon: <Star className="w-5 h-5 text-white" />,
      fields: ["ministries", "reasonForNonParticipation", "leadershipRole", "skillsTalents", "spiritualGifts"],
    },
    {
      title: "Health & Welfare Information",
      icon: <HeartPulse className="w-5 h-5 text-white" />,
      fields: ["hasHealthIssues", "specialNeedsOrMedicalConditions", "leadershipRole"],
    },
  ];

  const displayValue = (value) => {
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value || <em className="text-gray-400">Not Provided</em>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-2">Church Member Registration</h1>
      <p className="text-center text-gray-600 mb-8">
        Review all information carefully before submission.
      </p>

      <form onSubmit={handleFinalSubmit} className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="rounded-xl border shadow bg-white overflow-hidden">
            <div className="flex justify-between items-center bg-blue-600 px-4 py-3">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="bg-blue-500 p-1 rounded">{section.icon}</span>
                {section.title}
              </div>

              {editingSection === section.title ? (
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="text-white hover:text-gray-100 flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingSection(section.title)}
                  className="text-white hover:text-gray-100 flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
              )}
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.fields.map((field) => {
                const isArray = Array.isArray(localData[field]);
                const value = localData[field];

                return (
                  <div key={field} className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-400 border">
                    <p className="text-xs text-gray-500 capitalize mb-1">
                      {field.replace(/([A-Z])/g, " $1")}
                    </p>

                    {editingSection === section.title ? (
                      <input
                        type="text"
                       value={Array.isArray(value) ? value.join(", ") : value || ""}

                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{displayValue(value)}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {section.subTitle && section.subFields && section.subObject && (
              <div className="px-6 pb-6">
                <h4 className="text-center font-semibold mb-4 mt-2">{section.subTitle}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.subFields.map((sub) => (
                    <div key={sub} className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-400 border">
                      <p className="text-xs text-gray-500 capitalize mb-1">
                        {sub.replace(/([A-Z])/g, " $1")}
                      </p>

                      {editingSection === section.title ? (
                        <input
                          type="text"
                          value={localData[section.subObject]?.[sub] || ""}
                          onChange={(e) =>
                            handleFieldChange(sub, e.target.value, section.subObject)
                          }
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {displayValue(localData[section.subObject]?.[sub])}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {editingSection === section.title && (
              <div className="flex justify-end px-6 pb-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                >
                  <Save className="w-4 h-4" /> Save Section
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Submit / Reset */}
        <div className="flex justify-between pt-6">
          

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 ml-100 text-white rounded ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step7ReviewSubmit;
