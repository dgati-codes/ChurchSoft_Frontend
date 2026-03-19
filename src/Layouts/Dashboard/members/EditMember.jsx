import { useEffect, useState } from "react";
import { useHierarchy } from "../../../api/services/locationService.js";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function EditMemberModal({ member, onClose, onSave }) {
  const { isAdmin } = useAuth();

  // Store original member to preserve hidden/backend fields
  const [originalMember, setOriginalMember] = useState({});
  // Store editable form values
  const [form, setForm] = useState({});

  const { countries, regions, districts, assemblies, formatName } =
    useHierarchy({
      country: form.country,
      region: form.jurisdiction,
      district: form.district,
    });

  useEffect(() => {
  if (member) {
    const normalize = (val) =>
      val?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    setOriginalMember(member);

    setForm({
      ...member,
      country: normalize(member.country),
      jurisdiction: normalize(member.jurisdiction),
      district: normalize(member.district),
      assembly: normalize(member.assembly),
    });
  }
}, [member]);

  if (!member) return null;

  // Generic change handler for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler: merge original + edited fields, safely handle arrays and nested objects
  const handleSubmit = () => {
    const payload = {
      ...originalMember, // preserve all backend-required fields
      ...form, // override only edited fields
      preferredLanguages: Array.isArray(form.preferredLanguages)
        ? form.preferredLanguages
        : [form.preferredLanguages].filter(Boolean),
      ministries: form.ministries || [],
      skillsTalents: form.skillsTalents || [],
      spiritualGifts: form.spiritualGifts || [],
      nextOfKin: form.nextOfKin || {
        name: "",
        relationship: "",
        contactInformation: "",
      },
      consentForCommunication: form.consentForCommunication ?? false,
      whatsappAvailable: form.whatsappAvailable ?? false,
      hasHealthIssues: form.hasHealthIssues ?? false,
      updatedAt: new Date().toISOString(),
    };

    onSave(payload);
  };

  if (!countries.length) {
    return <div className="p-4">Loading...</div>;
  }
 

  return (
    <div className="fixed font-[DM Sans] inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg w-200 p-6 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">Edit Member</h2>

        {/* Full Name */}
        <div className="mb-3">
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="input w-full"
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            className="input w-full"
            name="dateOfBirth"
            value={form.dateOfBirth || ""}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="text-sm font-medium">Gender</label>
          <select
            className="input w-full"
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
          >
            <option>MALE</option>
            <option>FEMALE</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="mb-3">
          <label className="text-sm font-medium">Marital Status</label>
          <select
            className="input w-full"
            name="maritalStatus"
            value={form.maritalStatus || ""}
            onChange={handleChange}
          >
            <option>SINGLE</option>
            <option>MARRIED</option>
            <option>DIVORCED</option>
          </select>
        </div>

        {/* Hometown */}
        <div className="mb-3">
          <label className="text-sm font-medium">Hometown</label>
          <input
            className="input w-full"
            name="hometown"
            value={form.hometown || ""}
            onChange={handleChange}
          />
        </div>

        {/* Nationality */}
        <div className="mb-3">
          <div>
            <label className="text-gray-600 font-bold">
              Country<span className="text-red-600">*</span>
            </label>
            <select
              name="country"
              value={form.country || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  country: e.target.value,
                  jurisdiction: "",
                  district: "",
                  assembly: "",
                }))
              }
              className="input"
              required
            >
              <option value="">Select Country</option>

              {countries.map((c, i) => (
                <option key={i} value={c.countryName}>
                  {formatName(c.countryName)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Region<span className="text-red-600">*</span>
          </label>
          <select
            name="jurisdiction"
            value={form.jurisdiction || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                jurisdiction: e.target.value,
                district: "",
                assembly: "",
              }))
            }
            className="input"
            required
          >
            <option value="">Select Region</option>

            {regions.map((region, i) => (
              <option key={i} value={region.parentName}>
                {formatName(region.parentName)}
              </option>
            ))}
          </select>
        </div>
        {/* DISTRICT */}
        <div>
          <label className="text-sm font-medium">
            District<span className="text-red-600">*</span>
          </label>
          <select
            name="district"
            value={form.district || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                district: e.target.value,
                assembly: "",
              }))
            }
            className="input"
            required
          >
            <option value="">Select District</option>

            {districts.map((d, i) => (
              <option key={i} value={d.childName}>
                {d.childName}
              </option>
            ))}
          </select>
        </div>

        {/* ASSEMBLY */}
        <div>
          <label className="text-sm font-medium">
            Local Assembly<span className="text-red-600">*</span>
          </label>
          <select
            name="assembly"
            value={form.assembly || ""}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Assembly</option>

            {assemblies.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        {/* Ethnicity */}
        <div className="mb-3">
          <label className="text-sm font-medium">Ethnicity</label>
          <input
            className="input w-full"
            name="ethnicity"
            value={form.ethnicity || ""}
            onChange={handleChange}
          />
        </div>
        {/* Date of joined church */}
        <div className="mb-3">
          <label className="text-sm font-medium">Date Joined Church</label>
          <input
            type="date"
            className="input w-full"
            name="dateJoinedChurch"
            value={form.dateJoinedChurch || ""}
            onChange={handleChange}
          />
        </div>
        {/* Languages */}
        <div className="mb-3">
          <label className="text-sm font-medium">Languages</label>
          <input
            className="input w-full"
            name="preferredLanguages"
            value={form.preferredLanguages || ""}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            className="input w-full"
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        {/*email */}
        <div className="mb-3">
          <label className="text-sm font-medium">Email</label>
          <input
            className="input w-full"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="text-sm font-medium">Status</label>
          <select
            className="input w-full"
            name="status"
            value={form.status || ""}
            onChange={handleChange}
          >
            <option>ACTIVE</option>
            <option>VISITOR</option>
            <option>INACTIVE</option>
            <option>DECEASED</option>
            <option>SUSPENDED</option>
            <option>EXPELLED</option>
            <option>TRANSFER</option>
            <option>OTHER</option>
          </select>
        </div>
        {!isAdmin() && (
          <>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                back
              </button>
            </div>
          </>
        )}

        {isAdmin() && (
          <>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
