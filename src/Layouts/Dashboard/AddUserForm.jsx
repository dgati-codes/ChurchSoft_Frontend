import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { registerUser } from "../../api/userService";

const AddUserForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    localAssemblyName: "",
    roleName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setMessage("Please fill all required fields.");
      setShowError(true);
      return;
    }

    try {
      const result = await registerUser(formData);

      if (result.success) {
        setMessage(
          `${result.data.firstName} ${result.data.lastName} added successfully.`
        );
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          localAssemblyName: "",
          roleName: "",
        });
      } else {
        setMessage(result.message);
        setShowError(true);
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      setMessage("An error occurred while adding user.");
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Add User</h1>
          <p className="text-gray-500 mt-1">
            Please fill out all sections to complete the addition of a new user
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          {/* Username */}
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          {/* Local Assembly */}
          <InputField
            label="Local Assembly"
            name="localAssemblyName"
            value={formData.localAssemblyName}
            onChange={handleChange}
          />

          {/* Role */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Role<span className="text-red-500">*</span>
            </label>
            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select role</option>
              <option value="FINANCE">FINANCE</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PASTOR">PASTOR</option>
              <option value="LEADER">LEADER</option>
              <option value="MEMBER">MEMBER</option>
              <option value="GUEST">GUEST</option>
              <option value="REP">REP</option>
              <option value="ELDER">ELDER</option>
            </select>
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <Modal
          icon={<CheckCircle className="w-10 h-10 text-green-600" />}
          message={message}
          onClose={() => setShowSuccess(false)}
          buttonText="Close"
          buttonColor="bg-green-600"
        />
      )}

      {/* ❌ Error Modal */}
      {showError && (
        <Modal
          icon={<XCircle className="w-10 h-10 text-red-600" />}
          message={message}
          onClose={() => setShowError(false)}
          buttonText="Try Again"
          buttonColor="bg-red-600"
        />
      )}
    </div>
  );
};

/** Reusable Input Component */
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block text-gray-700 text-sm mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border p-2 rounded-md"
      required={required}
    />
  </div>
);

/** Reusable Modal Component */
const Modal = ({ icon, message, onClose, buttonText, buttonColor }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-4">{icon}</div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
      <button
        onClick={onClose}
        className={`mt-6 w-full ${buttonColor} hover:opacity-90 text-white font-medium py-2 rounded`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default AddUserForm;
