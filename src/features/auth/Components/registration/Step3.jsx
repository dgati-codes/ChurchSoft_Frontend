import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { Church } from "lucide-react";

// Backend enum mapping
const baptismTypeMap = {
  FULL_IMMERSION: "FULL_IMMERSION",
  POURING: "POURING",
  SPRINKLING: "SPRINKLING",
  INFANT: "INFANT",
  OTHERS: "OTHERS",
};

const Step3MembershipInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    status: formData.status || "",
    baptismStatus: formData.baptismStatus || "",
    baptismLocation: formData.baptismLocation || "",
    baptismDate: formData.baptismDate || "",
    dateJoinedChurch: formData.dateJoinedChurch || "",
    firstVisitDate: formData.firstVisitDate || "",
    invitedBy: formData.invitedBy || "",
    baptismType: formData.baptismType || "",
    salvationStatus: formData.salvationStatus || "",
    fellowshipGroup: formData.fellowshipGroup || "",
    churchExperienceRating: formData.churchExperienceRating || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm({
      ...localData,
      baptismType: baptismTypeMap[localData.baptismType] || "",
    });
    nextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg"
      >
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            <Church className="w-6 h-6 text-orange-500" />
            Spiritual Journey & Church Membership
            <span className="text-gray-500 text-sm">• 3/7</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1 ml-6">
            Tracks spiritual growth, integration into the church, and status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Joined Church */}
          <div>
            <label className="text-gray-700 font-semibold">
              Date Joined Church<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="dateJoinedChurch"
              value={localData.dateJoinedChurch}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Membership Status */}
          <div>
            <label className="text-gray-600 font-semibold">
              Membership Status<span className="text-red-600">*</span>
            </label>
            <select
              name="status"
              value={localData.status}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="VISITOR">VISITOR</option>
              <option value="TRANSFER">TRANSFER</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          {/* Baptism Status */}
          <div>
            <label className="text-gray-600 font-semibold">
              Baptism Status<span className="text-red-600">*</span>
            </label>
            <select
              name="baptismStatus"
              value={localData.baptismStatus}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select status</option>
              <option value="BAPTIZED">BAPTIZED</option>
              <option value="NOT_BAPTIZED">NOT_BAPTIZED</option>
            </select>
          </div>

          {/* Baptism Date */}
          <div>
            <label className="text-gray-600 font-semibold">Baptism Date</label>
            <input
              type="date"
              name="baptismDate"
              value={localData.baptismDate}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Baptism Location */}
          <div>
            <label className="text-gray-600 font-semibold">Baptism Location</label>
            <input
              type="text"
              name="baptismLocation"
              value={localData.baptismLocation}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Invited By */}
          <div>
            <label className="text-gray-600 font-semibold">Invited By</label>
            <input
              type="text"
              name="invitedBy"
              value={localData.invitedBy}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Baptism Type */}
          <div>
            <label className="text-gray-600 font-semibold">
              Baptism Type<span className="text-red-600">*</span>
            </label>
            <select
              name="baptismType"
              value={localData.baptismType}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select type</option>
              <option value="FULL_IMMERSION">FULL_IMMERSION</option>
              <option value="POURING">POURING</option>
              <option value="SPRINKLING">SPRINKLING</option>
              <option value="INFANT">INFANT</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
          <div>
            <label className="text-gray-600 font-semibold">
              Salvation Status<span className="text-red-600">*</span>
            </label>
            <select
              name="salvationStatus"
              value={localData.salvationStatus}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select type</option>
              <option value="BORN_AGAIN">BORN_AGAIN</option>
              <option value="SEEKING">SEEKING</option>
              <option value="NOT_APPLICABLE">NOT_APPLICABLE</option>
              
            </select>
          </div>

          

          {/* Fellowship Group / Church Experience */}
          <div>
            <label className="text-gray-600 font-semibold">Church Experience Rating</label>
            <select
              name="churchExperienceRating"
              value={localData.churchExperienceRating}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="VERY_POOR">VERY_POOR</option>
              <option value="POOR">POOR</option>
              <option value="FAIR">FAIR</option>
              <option value="GOOD">GOOD</option>
              <option value="EXCELLENT">EXCELLENT</option>
            </select>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
    </div>
  );
};

export default Step3MembershipInfo;
