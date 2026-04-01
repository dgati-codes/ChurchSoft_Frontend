import { useEffect, useState } from "react";
import { useHierarchy } from "../../../api/services/hierarchyService.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import InputField from "../../Dashboard/modals/InputField.jsx";

const leadershipRoleOptions = [
  "Children Ministry",
  "Worship Team",
  "Junior Youth",
  "Senior Youth",
  "Men Ministry",
  "Women Ministry",
  "Tech Team",
  "media Team",
];
export default function EditMemberModal({ member, onClose, onSave }) {
  const { isAdmin } = useAuth();

  const [originalMember, setOriginalMember] = useState({});
  const [form, setForm] = useState({});

  // 🔹 Load hierarchy
  const { nationalities, regions, districts, assemblies } = useHierarchy({
    nationality: form.nationality,
    region: form.jurisdiction,
    district: form.district,
  });

  useEffect(() => {
    if (member) {
      setOriginalMember(member);

      setForm({
        ...member,
        nationality: member.nationality,
        jurisdiction: member.jurisdiction,
        district: member.district,
        assembly: member.assembly,
      });
    }
  }, [member]);

  if (!member) return null;

  // 🔹 Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Country change
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      nationality: value,
      jurisdiction: "",
      district: "",
      assembly: "",
    }));
  };

  // 🔹 Region change
  const handleRegionChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      jurisdiction: value,
      district: "",
      assembly: "",
    }));
  };

  // 🔹 District change
  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      district: value,
      assembly: "",
    }));
  };

  // 🔹 Submit
  const handleSubmit = () => {
    const payload = {
      ...originalMember,
      ...form,
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

  // 🔹 Loading guard
  if (!nationalities.length) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="fixed font-[DM Sans] inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg w-4xl p-6 overflow-y-auto max-h-screen">
        {!isAdmin() && (
          <h2 className="text-xl font-semibold mb-4">View Member</h2>
        )}
        {isAdmin() && (
          <h2 className="text-2xl font-bold mb-4">Edit Member Information</h2>
        )}

        <div className="flex justify-between">
          <div>
            {/* Full Name */}
            <div className="mb-6">
              <label className="text-sm font-medium">Full Name</label>
              <input
                className="input w-full"
                name="fullName"
                value={form.fullName || ""}
                onChange={handleChange}
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
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
            <div className="mb-6">
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
            <div className="mb-6 mt-6">
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
            {/* ID NUMBER */}
            <div className="mb-6">
              <InputField
                placeholder="Your ID Number"
                label="ID Number"
                labelClassName="text-sm font-medium"
                name="identificationNumber"
                value={form.identificationNumber || ""}
                onChange={handleChange}

                // required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                className="input w-full"
                placeholder="enter phone number"
                name="phoneNumber"
                value={form.phoneNumber || ""}
                onChange={handleChange}
              />
            </div>

            {/* FATHER */}
            <div className="mb-6">
              <InputField
                placeholder="Father's Name"
                label="Father's Name"
                labelClassName="text-sm font-medium"
                name="fathersName"
                value={form.fathersName || ""}
                onChange={handleChange}
                className="input mb-6"
              />
            </div>

            {/* MOTHER */}
            <div className="mb-6">
              <InputField
                placeholder="Mother's Name"
                label="Mother's Name"
                labelClassName="text-sm font-medium"
                name="mothersName"
                value={form.mothersName || ""}
                onChange={handleChange}
              />
            </div>

            {/* Hometown */}
            <div className="mb-6">
              <label className="text-sm font-medium">Hometown</label>
              <input
                className="input w-full"
                placeholder="hometown"
                name="hometown"
                value={form.hometown || ""}
                onChange={handleChange}
              />
            </div>
              {/* Ethnicity */}
            <div className="mb-6">
              <label className="text-sm font-medium">Ethnicity</label>
              <input
                className="input w-full"
                name="ethnicity"
                placeholder="ethnicity"
                value={form.ethnicity || ""}
                onChange={handleChange}
              />
            </div>

            {/* Nationality */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Country<span className="text-red-600">*</span>
              </label>
              <select
                name="country"
                value={form.nationality || ""}
                onChange={handleCountryChange}
                className="input"
                required
              >
                <option value="">Select Country</option>
                {nationalities.map((c, i) => (
                  <option key={i} value={c.countryName}>
                    {c.countryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Region<span className="text-red-600">*</span>
              </label>
              <select
                name="jurisdiction"
                value={form.jurisdiction || ""}
                onChange={handleRegionChange}
                className="input"
                disabled={!form.nationality}
              >
                <option value="">Select Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r.parentName}>
                    {r.parentName}
                  </option>
                ))}
              </select>
            </div>

          
          </div>

          <div>
            {/* Date of joined church */}
            <div className="mb-6">
              <label className="text-sm font-medium">Date Joined Church</label>
              <input
                type="date"
                className="input w-full"
                name="dateJoinedChurch"
                value={form.dateJoinedChurch || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium">
                Baptism Status<span className="text-red-600">*</span>
              </label>
              <select
                name="baptismStatus"
                value={form.baptismStatus || ""}
                onChange={handleChange}
                className="w-full rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // required
              >
                <option value="">Select status</option>
                <option value="BAPTIZED">BAPTIZED</option>
                <option value="NOT_BAPTIZED">NOT_BAPTIZED</option>
              </select>
            </div>

            {/* Baptism Date */}
            <div className="mb-6">
              <label className="text-sm font-medium">Baptism Date</label>
              <input
                type="date"
                name="baptismDate"
                value={form.baptismDate || ""}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
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
            <div className="mb-6">
              <label className="text-sm font-medium">Languages</label>
              <input
                className="input w-full"
                placeholder="enter preferred language"
                name="preferredLanguages"
                value={form.preferredLanguages || ""}
                onChange={handleChange}
              />
            </div>

            {/*email */}
            <div className="mb-6">
              <label className="text-sm font-medium">Email</label>
              <input
                className="input w-full"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
            </div>

            {/* MINISTRY AFFILIATION */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Ministry Affiliation
              </label>
              <select
                name="ministryAffiliation"
                value={form.ministryAffiliation || ""}
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

            {/* Status */}
            <div className="mb-6">
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

           

            <div className="mb-6">
              <label className="text-sm font-medium">Physical Address</label>
              <input
                name="physicalAddress"
                value={form.physicalAddress}
                onChange={handleChange}
                placeholder="Area of Residence / Physical Address*"
                className="input"
                // required
              />
            </div>

            {/* Leadership Role */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Leadership Role (optional)
              </label>
              <select
                name="leadershipRole"
                value={form.leadershipRole}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a role</option>
                {leadershipRoleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

             {/* District */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                District<span className="text-red-600">*</span>
              </label>
              <select
                name="district"
                value={form.district || ""}
                onChange={handleDistrictChange}
                className="input"
                disabled={!form.jurisdiction}
              >
                <option value="">Select District</option>
                {districts.map((d, i) => (
                  <option key={i} value={d.childName}>
                    {d.childName}
                  </option>
                ))}
              </select>
            </div>

            {/* Assembly */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Local Assembly<span className="text-red-600">*</span>
              </label>
              <select
                name="assembly"
                value={form.assembly || ""}
                onChange={handleChange}
                className="input"
                disabled={!form.district}
              >
                <option value="">Select Assembly</option>
                {assemblies.map((a, i) => (
                  <option key={i} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
