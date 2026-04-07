import {
  Book,
  Church,
  HeartPulse,
  MapPin,
  Pencil,
  Save,
  Star,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCreateMember } from "../../../../../hooks/member-hooks/useCreateMember";
import SuccessModal from "../../../modals/successModal";
import { useRegistration } from "../../registration-context/RegistrationContext";

const Step7ReviewSubmit = () => {
  const { formData, updateForm, resetForm } = useRegistration();
  const [editingSection, setEditingSection] = useState(null);
  const [localData, setLocalData] = useState(formData || {});
  const [successModal, setSuccessModal] = useState(null);

  const ARRAY_FIELDS = [
    "skillsTalents",
    "spiritualGifts",
    "ministries",
    "preferredLanguages",
  ];

  const MINISTRY_ENUM_MAP = {
    CHOIR: "CHOIR",
    EVANGELISM: "EVANGELISM",
    PRAYER_WARRIOR: "PRAYER_WARRIOR",
    USHER: "USHER",
    SUNDAY_TEACHERS: "SUNDAY_TEACHERS",
    MEDIA: "MEDIA",
    WELFARE: "WELFARE",
    OTHER: "OTHER",
  };

  const normalizeEnum = (value, map) => {
    if (!value) return null;

    const key = value.toString().trim().toLowerCase();
    return map[key] || value;
  };
  /* ---------------- HANDLE FIELD CHANGE ---------------- */
 
  const { mutate: createMember, isPending: loading } = useCreateMember({
    onSuccess: () => {
      setSuccessModal({
        name: localData.fullName || "Member",
        action: "registered",
      });

      // resetForm(); // optional
    },

    onError: (error) => {
      console.error("Backend error:", error?.response?.data || error);
      alert("Error creating member. Please try again.");
    },
  });
  const handleFieldChange = (key, value, subObject = null) => {
    const normalizeArray = (val) => {
      if (typeof val === "string") {
        return val
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      }

      if (Array.isArray(val)) {
        return val
          .map((v) => (typeof v === "string" ? v.trim() : v))
          .filter(Boolean);
      }

      return [];
    };

    const finalValue = ARRAY_FIELDS.includes(key)
      ? normalizeArray(value)
      : value;

    setLocalData((prev) => {
      if (subObject) {
        return {
          ...prev,
          [subObject]: {
            ...(prev?.[subObject] || {}),
            [key]: finalValue,
          },
        };
      }

      return { ...prev, [key]: finalValue };
    });
  };

  /* ---------------- SAVE SECTION ---------------- */

  const handleSave = () => {
    updateForm(localData);
    setEditingSection(null);
  };

  /* ---------------- FINAL SUBMIT ---------------- */

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    try {
      const payload = JSON.parse(JSON.stringify(localData));

      // Boolean normalization
      payload.hasHealthIssues =
        payload?.hasHealthIssues === "YES" || payload?.hasHealthIssues === true;

      payload.healthCondition =
        payload?.healthCondition === "YES" || payload?.healthCondition === true;

      // Array + ENUM normalization
      ARRAY_FIELDS.forEach((field) => {
        if (!Array.isArray(payload[field])) payload[field] = [];

        payload[field] = payload[field]
          .map((v) => {
            let value =
              typeof v === "string"
                ? v.trim()
                : typeof v === "object"
                  ? v?.ministryName || v?.name
                  : null;

            if (field === "ministries") {
              value = normalizeEnum(value, MINISTRY_ENUM_MAP);
            }

            return value;
          })
          .filter(Boolean);
      });

      // Empty string → null
      Object.keys(payload).forEach((key) => {
        if (payload[key] === "") payload[key] = null;
      });

      console.log("FINAL PAYLOAD:", payload);

      // React Query mutation
      createMember(payload);
    } catch (error) {
      console.error("Processing error:", error);
    }
  };

  /* ---------------- DISPLAY VALUE ---------------- */

  const displayValue = (value) => {
    if (Array.isArray(value)) {
      if (!value.length) return "None";

      return value
        .map((v) => (typeof v === "object" ? v?.ministryName || v?.name : v))
        .join(", ");
    }

    if (typeof value === "boolean") return value ? "Yes" : "No";

    return value || <em className="text-gray-400">Not Provided</em>;
  };

  /* ---------------- FORM SECTIONS ---------------- */

  const sections = [
    {
      title: "Personal & Identity Information",
      icon: <User className="w-5 h-5 text-white" />,
      fields: [
        "userId",
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
      fields: ["phoneNumber", "email", "whatsappAvailable", "physicalAddress"],
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
        "invitedBy",
        "salvationStatus",
        "churchExperienceRating",
      ],
    },
    {
      title: "Education & Career Details",
      icon: <Book className="w-5 h-5 text-white" />,
      fields: [
        "educationalLevel",
        "occupation",
        "employmentSector",
        "employmentType",
      ],
    },
    {
      title: "Ministry Involvement & Skills",
      icon: <Star className="w-5 h-5 text-white" />,
      fields: [
        "ministries",
        "reasonForNonParticipation",
        "leadershipRole",
        "skillsTalents",
        "spiritualGifts",
      ],
    },
    {
      title: "Health & Welfare Information",
      icon: <HeartPulse className="w-5 h-5 text-white" />,
      fields: [
        "createdBy",
        "createdDate",
        "hasHealthIssues",
        "specialNeedsOrMedicalConditions",
      ],
    },
  ];

  // console.log(formData)
  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl font-[DM Sans] mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Church Member Registration
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Review all information carefully before submission.
      </p>

      <form onSubmit={handleFinalSubmit} className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border shadow bg-white overflow-hidden"
          >
            <div className="flex justify-between items-center bg-blue-600 px-4 py-3">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="bg-blue-500 p-1 rounded">{section.icon}</span>
                {section.title}
              </div>

              {editingSection === section.title ? (
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="text-white flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingSection(section.title)}
                  className="text-white flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
              )}
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.fields.map((field) => {
                const value = localData?.[field];

                return (
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
                        value={
                          Array.isArray(value)
                            ? value.join(", ")
                            : (value ?? "")
                        }
                        onChange={(e) =>
                          handleFieldChange(field, e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">
                        {displayValue(value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

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
                          value={localData?.[section.subObject]?.[sub] ?? ""}
                          onChange={(e) =>
                            handleFieldChange(
                              sub,
                              e.target.value,
                              section.subObject,
                            )
                          }
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {displayValue(localData?.[section.subObject]?.[sub])}
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
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded"
                >
                  <Save className="w-4 h-4" /> Save Section
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white cursor-pointer rounded ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        onAutoClose={resetForm}
      />
    </div>
  );
};

export default Step7ReviewSubmit;
