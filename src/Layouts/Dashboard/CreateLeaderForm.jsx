import React, { useState } from 'react';

const CreateLeaderForm = () => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input
    if (e.target.name === 'password') {
  const strength = checkPasswordStrength(e.target.value);
  setPasswordStrength(strength);
}

  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const checkPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return 'Weak';
  if (strength === 2 || strength === 3) return 'Medium';
  if (strength === 4) return 'Strong';
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({
        name: '',
        role: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Leader Account</h2>

      {success && (
        <div className="mb-4 text-green-600 text-center font-semibold">
          Leader account created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Role */}
        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Pastor">Pastor</option>
            <option value="Elder">Elder</option>
            <option value="Admin">Admin</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

  {formData.password && (
    <div className="mt-2">
      <p className="text-sm font-medium">
        Strength:{" "}
        <span
          className={`font-bold ${
            passwordStrength === 'Weak'
              ? 'text-red-500'
              : passwordStrength === 'Medium'
              ? 'text-yellow-500'
              : 'text-green-600'
          }`}
        >
          {passwordStrength}
        </span>
      </p>
      <div className="h-2 mt-1 rounded bg-gray-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            passwordStrength === 'Weak'
              ? 'w-1/3 bg-red-500'
              : passwordStrength === 'Medium'
              ? 'w-2/3 bg-yellow-500'
              : 'w-full bg-green-600'
          }`}
        ></div>
      </div>
    </div>
  )}
</div>


        {/* Confirm Password */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateLeaderForm;
