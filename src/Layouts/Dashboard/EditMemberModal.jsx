import React, { useState, useEffect } from "react";

export default function EditMemberModal({ member, onClose, onSave }) {
  // Do not render if no member is selected
  if (!member) return null;

  // Initialize form state with all backend fields
  const [form, setForm] = useState({
    id: member.id,
    memberId: member.memberId,
    fullName: member.fullName || "",
    dateOfBirth: member.dateOfBirth || "",
    gender: member.gender || "MALE",
    maritalStatus: member.maritalStatus || "SINGLE",
    hometown: member.hometown || "",
    nationality: member.nationality || "",
    assembly: member.assembly || "",
    district: member.district || "",
    ethnicity: member.ethnicity || "",
    phoneNumber: member.phoneNumber || "",
    status: member.status || "ACTIVE",
  });

  // Update form when a new member is passed
  useEffect(() => {
    if (member) {
      setForm({
        id: member.id,
        memberId: member.memberId,
        fullName: member.fullName || "",
        dateOfBirth: member.dateOfBirth || "",
        gender: member.gender || "MALE",
        maritalStatus: member.maritalStatus || "SINGLE",
        hometown: member.hometown || "",
        nationality: member.nationality || "",
        assembly: member.assembly || "",
        district: member.district || "",
        ethnicity: member.ethnicity || "",
        phoneNumber: member.phoneNumber || "",
        status: member.status || "ACTIVE",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form); // pass entire object to saveEdit
  };

  return (
    <div className="fixed font-[Poppins] inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg w-96 p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Member</h2>

        {/* Full Name */}
        <div className="mb-3">
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="input w-full"
            name="fullName"
            value={form.fullName}
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
            value={form.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="text-sm font-medium">Gender</label>
          <select
            className="input w-full"
            name="gender"
            value={form.gender}
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
            value={form.maritalStatus}
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
            value={form.hometown}
            onChange={handleChange}
          />
        </div>

        {/* Nationality */}
        <div className="mb-3">
          <label className="text-sm font-medium">Nationality</label>
          <input
            className="input w-full"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
          />
        </div>

        {/* Assembly */}
        <div className="mb-3">
          <label className="text-sm font-medium">Assembly</label>
          <input
            className="input w-full"
            name="assembly"
            value={form.assembly}
            onChange={handleChange}
          />
        </div>

        {/* District */}
        <div className="mb-3">
          <label className="text-sm font-medium">District</label>
          <input
            className="input w-full"
            name="district"
            value={form.district}
            onChange={handleChange}
          />
        </div>

        {/* Ethnicity */}
        <div className="mb-3">
          <label className="text-sm font-medium">Ethnicity</label>
          <input
            className="input w-full"
            name="ethnicity"
            value={form.ethnicity}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            className="input w-full"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="text-sm font-medium">Status</label>
          <select
            className="input w-full"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>ACTIVE</option>
            <option>VISITOR</option>
            <option>INACTIVE</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
