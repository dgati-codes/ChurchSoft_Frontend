import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import {
  assignImageToUser,
  uploadImage,
} from "../../../api/services/userImageService";
import  UserService  from "../../../api/services/userService";
import InputField from "../modals/InputField";
import SuccessModal from "../modals/successModal";
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
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] || null });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setMessage("Please fill all required fields.");
      setShowError(true);
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
        setMessage(result?.message || "Failed to add user.");
        setShowError(true);
        return;
      }

      const userId = result?.data?.id;

      if (userId && imageId) {
        await assignImageToUser(userId, imageId);
      }

      setMessage({
         name: `${result.firstName} ${result.lastName}`,
        text: "added successfully.",
      });
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
        image: null,
      });
    } catch (error) {
      setMessage(error.message || "An error occurred while adding user.");
      setShowError(true);
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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </form>

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
        <SuccessModal
          icon={<CheckCircle className="w-10 h-10 text-blue-600" />}
          message={
            <>
              <span className="text-green-600 font-semibold">
                {message.firstName} {message.lastName}
              </span>{" "}
              added successfully.
            </>
          }
          onClose={() => setShowSuccess(false)}
          buttonText="Close"
          buttonColor="bg-green-600"
        />
      )}

      {showError && (
        <SuccessModal
          icon={<XCircle className="w-10 h-10 text-red-600" />}
          message={<span className="text-red-600">{message}</span>}
          onClose={() => setShowError(false)}
          buttonText="Try Again"
          buttonColor="bg-red-600"
        />
      )}
    </div>
  );
};

export default AddUserForm;
