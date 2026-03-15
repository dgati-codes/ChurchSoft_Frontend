import { useState } from "react";
import {
  assignImageToUser,
  uploadImage,
} from "../../../api/services/userImageService";
import UserService from "../../../api/services/userService";
import ErrorModal from "../modals/ErrorModal ";
import InputField from "../modals/InputField";
import SuccessModal from "../modals/successModal";

const AddUserForm = () => {
  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });
  // const [message, setMessage] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    localAssemblyName: "",
    roleName: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorModal("Please fill all required fields.");
      setErrorModal(true);
      return;
    }

    try {
      let imageId = null;

      if (formData.image) {
        const uploadedImage = await uploadImage(formData.image);
        imageId = uploadedImage?.id;
      }

      const payload = { ...formData, image: undefined };
      const result = await UserService.registerUser(payload);

      if (!result?.success) {
        setErrorModal(result?.message || "Failed to add user.");
        setErrorModal(true);
        return;
      }

      const userId = result?.data?.id;

      if (userId && imageId) {
        await assignImageToUser(userId, imageId);
      }

      // ✅ Show success modal
      setSuccessModal({
        name: `${result.data.firstName} ${result.data.lastName}`,
        action: "added",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        localAssemblyName: "",
        roleName: "",
        image: null,
      });
    } catch (error) {
      setErrorModal({
        show: true,
        message: error.message || "Failed to add user.",
      });
    }
  };

  return (
    <div className="min-h-screen font-[DM Sans] bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Add User</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please fill out all sections to complete the addition of a new user
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            required
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <InputField
            required
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <InputField
            required
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <InputField
            required
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <InputField
            label="Local Assembly"
            name="localAssemblyName"
            value={formData.localAssemblyName}
            onChange={handleChange}
          />

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Role<span className="text-red-500">*</span>
            </label>

            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md bg-gray-100 border-gray-100"
              required
            >
              <option value="">Select role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="FINANCE">FINANCE</option>
              <option value="PASTOR">PASTOR</option>
              <option value="LEADER">LEADER</option>
              <option value="ELDER">ELDER</option>
              <option value="MEMBER">MEMBER</option>
              <option value="GUEST">GUEST</option>
              <option value="REP">REP</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      {/* ERROR MODAL */}
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
    </div>
  );
};

export default AddUserForm;
