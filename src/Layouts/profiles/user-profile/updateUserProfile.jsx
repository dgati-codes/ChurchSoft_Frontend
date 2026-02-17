import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../api/services/userService";
import { useAuth } from "../../../context/AuthContext";
import SuccessModal from "../../Dashboard/modals/successModal.jsx";

function UpdateUserProfile() {
  const { user, updateUser } = useAuth();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    localAssemblyName: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        localAssemblyName: user.localAssemblyName || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: user.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: user.username,
      email: formData.email,
      // profileImage: user.profileImage,
      phoneNumber: formData.phoneNumber,
      localAssemblyName: formData.localAssemblyName,
      status: user.status,
    };

    const result = await UserService.updateUser(payload);

    if (result.success) {
      updateUser(payload);
      setSuccessMessage(result.message || "Profile updated successfully");
      setShowSuccessModal(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#031B6B] py-6 px-6">
      <div className="flex ml-10 items-center ">
        <Link
          to="/user-profile"
          className="flex bg-gray-200 rounded-sm p-2 items-center gap-2 font-bold text-blue-600"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <h1 className="text-xl font-bold text-center text-white mb-5">
        Personal Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-md p-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Local Assembly <span className="text-red-500">*</span>
            </label>
            <input
            name="localAssemblyName"
              value={formData.localAssemblyName}
               onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              value={user?.roleName || ""}
              type="text"
              readOnly
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end-safe mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          message={successMessage}
          onClose={handleSuccessModalClose}
          buttonText="Close"
          buttonColor="bg-blue-500"
        />
      )}
    </div>
  );
}

export default UpdateUserProfile;
