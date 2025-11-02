import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import {
  Pencil,
  User,
  MapPin,
  Church,
  Book,
  HeartPulse,
  Star,
  Save,
  X,
} from "lucide-react";

const Step7ReviewSubmit = () => {
  const { formData, updateForm } = useRegistration();
  const [editingSection, setEditingSection] = useState(null);
  const [localData, setLocalData] = useState(formData);

  const sections = [
    {
      title: "Personal & Identity Information",
      icon: <User className="text-white w-5 h-5" />,
      step: 1,
      fields: [
        "fullName",
        "dob",
        "gender",
        "maritalStatus",
        "hometown",
        "nationality",
        "ethnicity",
        "idType",
        "idNumber",
        "fatherName",
        "motherName",
        "genderMinistry",
      ],
    },
    {
      title: "Contact & Location Details",
      icon: <MapPin className="text-white w-5 h-5" />,
      step: 2,
      fields: [
        "phoneNumber",
        "email",
        "whatsapp",
        "residentialAddress",
      ],
      subTitle: "Next of Kin Details",
      subFields: [
        "nextOfKinName",
        "nextOfKinRelationship",
        "nextOfKinContact",
      ],
    },
    {
      title: "Spiritual Journey & Church Membership",
      icon: <Church className="text-white w-5 h-5" />,
      step: 3,
      fields: [
        "membershipStatus",
        "membershipDate",
        "firstVisitDate",
        "invitedBy",
        "baptismStatus",
        "baptismDate",
        "membershipType",
        "fellowshipGroup",
      ],
    },
    {
      title: "Education & Career Details",
      icon: <Book className="text-white w-5 h-5" />,
      step: 4,
      fields: [
        "educationLevel",
        "Profession",
        "EmploymentSector",
        "EmploymentType",
        
      ],
    },
    {
      title: "Ministry Involvement & Skills",
      icon: <Star className="text-white w-5 h-5" />,
      step: 5,
      fields: ["ministries", "reason",   "leadershipRole", "skills"],
    },
    {
      title: "Emergency & Health Information",
      icon: <HeartPulse className="text-white w-5 h-5" />,
      step: 6,
      fields: [
        "healthCondition",
        "specialNeeds",
      ],
    },
  ];

  const handleFieldChange = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (section) => {
    updateForm(localData);
    setEditingSection(null);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Final Submitted Data:", formData);
    alert("Registration complete!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Church Member Registration
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Review all information carefully before submission.
      </p>
      
      <form onSubmit={handleFinalSubmit} className="space-y-8">
        
        {sections.map((section, i) => (
          <div
            key={i}
            className="rounded-xl border shadow bg-white overflow-hidden"
          >
            {/* Section Header */}
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

            {/* Section Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.fields.map((field) => (
                <div
                  key={field}
                  className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-400 border"
                >
                  <p className="text-xs text-gray-500 capitalize mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </p>
                  {editingSection === section.title ? (
                    <input
                      type="text"
                      value={localData[field] || ""}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">
                      {formData[field] || (
                        <em className="text-gray-400">Not Provided</em>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Sub-section (Next of Kin, etc.) */}
            {section.subTitle && (
              <div className="px-6 pb-6">
                <h4 className="text-center font-semibold mb-4 mt-2">
                  {section.subTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.subFields.map((sub) => (
                    <div
                      key={sub}
                      className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-400 border"
                    >
                      <p className="text-xs text-gray-500 capitalize mb-1">
                        {sub.replace(/([A-Z])/g, " $1")}
                      </p>
                      {editingSection === section.title ? (
                        <input
                          type="text"
                          value={localData[sub] || ""}
                          onChange={(e) =>
                            handleFieldChange(sub, e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData[sub] || (
                            <em className="text-gray-400">Not Provided</em>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save button (visible in edit mode) */}
            {editingSection === section.title && (
              <div className="flex justify-end px-6 pb-6">
                <button
                  type="button"
                  onClick={() => handleSave(section)}
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                >
                  <Save className="w-4 h-4" /> Save Section
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Submit */}
        <div className="flex justify-between pt-6">
          <button
            type="reset"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-400"
          >
            Start Over
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step7ReviewSubmit;
