import React, { useState } from "react";
import { X } from "lucide-react";
import { attendanceService } from "../../api/attendanceService";
// Add this import
const AddAttendanceRecord = ({ isOpen, onClose, onRecordAdded }) => { // Added onRecordAdded prop
  const [formData, setFormData] = useState({
    serviceDate: "",
    serviceType: "",
    submittedBy: "",
    region: "",
    district: "",
    localAssembly: "",
    boys: 0,
    girls: 0,
    juniorYouthMale: 0,
    juniorYouthFemale: 0,
    seniorYouthMale: 0,
    seniorYouthFemale: 0,
    adultMen: 0,
    adultWomen: 0,
    visitorMale: 0,
    visitorFemale: 0,
    note: {
      generalObservations: "",
      challengesNoticed: "",
      recommendation: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      note: {
        ...prev.note,
        [name]: value,
      },
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Transform service type to match backend enum
      const serviceTypeMap = {
        "Sunday Service": "SUNDAY_SERVICE",
        "Midweek Service": "MIDWEEK_SERVICE",
        "Youth Service": "YOUTH_SERVICE",
        "Men's Fellowship": "MENS_FELLOWSHIP",
        "Women's Fellowship": "WOMENS_FELLOWSHIP",
        "Prayer Meeting": "PRAYER_MEETING",
        "Bible Study": "BIBLE_STUDY",
        "Outreach Program": "OUTREACH_PROGRAM",
        "Special Service": "SPECIAL_SERVICE",
      };
      const payload = {
        ...formData,
        serviceType: serviceTypeMap[formData.serviceType] || formData.serviceType,
      };
      const response = await attendanceService.createAttendance(payload);
      console.log("Attendance record created:", response);
      // Reset form
      setFormData({
        serviceDate: "",
        serviceType: "",
        submittedBy: "",
        region: "",
        district: "",
        localAssembly: "",
        boys: 0,
        girls: 0,
        juniorYouthMale: 0,
        juniorYouthFemale: 0,
        seniorYouthMale: 0,
        seniorYouthFemale: 0,
        adultMen: 0,
        adultWomen: 0,
        visitorMale: 0,
        visitorFemale: 0,
        note: {
          generalObservations: "",
          challengesNoticed: "",
          recommendation: "",
        },
      });
      // Notify parent component
      if (onRecordAdded) {
        onRecordAdded(response);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting attendance:", error);
      // Fallback handling for auth errors (global interceptor should catch most cases)
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("accessToken"); // Clear token
        setError("Session expired. Redirecting to login...");
        // Redirect after a brief delay to show message
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }
      setError(
        error.response?.data?.message || "Failed to create attendance record"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute font-[Poppins] inset-0 flex items-center justify-center bg-black/40 rounded-lg z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Add New Attendance Record</h2>
            <p className="text-gray-500"> Fill in the attendance details for the service. </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Top fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">
                Service Date<span className='text-red-600'>*</span>
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Service Type<span className='text-red-600'>*</span>
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select service</option>
                <option value="Sunday Service">Sunday Service</option>
                <option value="Midweek Service">Midweek Service</option>
                <option value="Youth Service">Youth Service</option>
                <option value="Men's Fellowship">Men's Fellowship</option>
                <option value="Women's Fellowship">Women's Fellowship</option>
                <option value="Prayer Meeting">Prayer Meeting</option>
                <option value="Bible Study">Bible Study</option>
                <option value="Outreach Program">Outreach Program</option>
                <option value="Special Service">Special Service</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">
                {" "}Submitted By<span className="text-red-600">*</span>{" "}
              </label>
              <input
                type="text"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
                className="input"
                placeholder="Enter name"
                required
              />
            </div>
          </div>
          {/* Region, District, Assembly */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">
                Region<span className='text-red-600'>*</span>
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select region</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">
                District<span className='text-red-600'>*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select district</option>
                <option value="District A">District A</option>
                <option value="District B">District B</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Local Assembly<span className='text-red-600'>*</span>
              </label>
              <select
                name="localAssembly"
                value={formData.localAssembly}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select assembly</option>
                <option value="Assembly A">Assembly A</option>
                <option value="Assembly B">Assembly B</option>
              </select>
            </div>
          </div>
          {/* Attendance Numbers */}
          <div>
            <h3 className="font-semibold mb-2">Attendance Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {/* Children */}
              <div>
                <p>Children</p>
                <div className="flex gap-4">
                  <div>
                    <label>Boys</label>
                    <input
                      type="number"
                      name="boys"
                      value={formData.boys}
                      onChange={(e) => handleNumberChange("boys", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>Girls</label>
                    <input
                      type="number"
                      name="girls"
                      value={formData.girls}
                      onChange={(e) => handleNumberChange("girls", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              {/* Junior Youth */}
              <div>
                <p>Junior Youth</p>
                <div className="flex gap-4">
                  <div>
                    <label>Male</label>
                    <input
                      type="number"
                      name="juniorYouthMale"
                      value={formData.juniorYouthMale}
                      onChange={(e) => handleNumberChange("juniorYouthMale", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>Female</label>
                    <input
                      type="number"
                      name="juniorYouthFemale"
                      value={formData.juniorYouthFemale}
                      onChange={(e) => handleNumberChange("juniorYouthFemale", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              {/* Senior Youth */}
              <div>
                <p>Senior Youth</p>
                <div className="flex gap-4">
                  <div>
                    <label>Male</label>
                    <input
                      type="number"
                      name="seniorYouthMale"
                      value={formData.seniorYouthMale}
                      onChange={(e) => handleNumberChange("seniorYouthMale", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>Female</label>
                    <input
                      type="number"
                      name="seniorYouthFemale"
                      value={formData.seniorYouthFemale}
                      onChange={(e) => handleNumberChange("seniorYouthFemale", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              {/* Adults */}
              <div>
                <p>Adults</p>
                <div className="flex gap-4">
                  <div>
                    <label>Men</label>
                    <input
                      type="number"
                      name="adultMen"
                      value={formData.adultMen}
                      onChange={(e) => handleNumberChange("adultMen", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>Women</label>
                    <input
                      type="number"
                      name="adultWomen"
                      value={formData.adultWomen}
                      onChange={(e) => handleNumberChange("adultWomen", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              {/* Visitors */}
              <div>
                <p>Visitors</p>
                <div className="flex gap-4">
                  <div>
                    <label>Male</label>
                    <input
                      type="number"
                      name="visitorMale"
                      value={formData.visitorMale}
                      onChange={(e) => handleNumberChange("visitorMale", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>Female</label>
                    <input
                      type="number"
                      name="visitorFemale"
                      value={formData.visitorFemale}
                      onChange={(e) => handleNumberChange("visitorFemale", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Notes Section */}
          <div>
            <h3 className="font-semibold mb-4">Notes (Optional)</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">General Observations</label>
                <textarea
                  name="generalObservations"
                  value={formData.note.generalObservations}
                  onChange={handleNoteChange}
                  className="input w-full h-20"
                  placeholder="Enter general observations..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Challenges Noticed</label>
                <textarea
                  name="challengesNoticed"
                  value={formData.note.challengesNoticed}
                  onChange={handleNoteChange}
                  className="input w-full h-20"
                  placeholder="Enter any challenges noticed..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Recommendations</label>
                <textarea
                  name="recommendation"
                  value={formData.note.recommendation}
                  onChange={handleNoteChange}
                  className="input w-full h-20"
                  placeholder="Enter recommendations..."
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttendanceRecord;