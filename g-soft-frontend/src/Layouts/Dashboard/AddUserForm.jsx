import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const AddUserForm = () => {
    const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    ministryGroup: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Added:", formData);
    // alert("User added successfully!");
    setShowSuccess(true); 
  };

  return (
    <div className="min-h-screen bg-gray-50   flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white  rounded-xl p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Add User</h1>
          <p  className="text-gray-500 mt-1">
            Please fill out all sections to complete the addition of a new user
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="input"            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Date of birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Ministry Group Association */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Ministry Group Association<span className="text-red-500">*</span>
            </label>
            <select
              name="ministryGroup"
              value={formData.ministryGroup}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select group association</option>
              <option value="Men Fellowship">Men Fellowship</option>
              <option value="Women Fellowship">Women Fellowship</option>
              <option value="Youth Ministry">Youth Ministry</option>
              <option value="Children Ministry">Children Ministry</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Role<span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Finance">Finance</option>
              <option value="Pastor">Pastor</option>
              <option value="Elder">Elder</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </form>

        {/* Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-10  bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              You have successfully added Mike Tyson as a new user.
            </h2>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserForm;
