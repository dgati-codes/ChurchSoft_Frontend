import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useAssembliesByCountry } from "../../../hooks/useAssembliesByCountry.js";
import useAddUser from "../../../hooks/user-hooks/useAddUser";
import InputField from "../modals/InputField";
import SuccessModal from "../modals/successModal";

const AddUserForm = () => {
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
  const { member } = useAuth();
  const country = member?.nationality;
  // console.log(member);
  const {
    data: assemblies,
    isLoading,
    error,
  } = useAssembliesByCountry(country);

  console.log("country:", country);
  console.log("loading:", isLoading);
  console.log("assemblies:", assemblies);
  console.log("error:", error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addUserMutation = useAddUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill all required fields.");

      return;
    }

    try {
      const user = await addUserMutation.mutateAsync(formData);

      // ✅ Success modal
      setSuccessModal({
        name: `${user.firstName} ${user.lastName}`,
        action: "added",
      });

      // ✅ Reset form
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
      toast.error(error?.response?.data?.message || "Failed to add user.");
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
          <div>
            <label className="block text-gray-700 font-bold text-sm mb-1">
              Local Assembly<span className="text-red-500">*</span>
            </label>
            <select
              name="localAssemblyName"
              value={formData.localAssemblyName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md bg-gray-100 border-gray-100"
            >
              <option value="">Select Assembly</option>
              {assemblies?.map((assembly) => (
                <option key={assembly.id} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-sm mb-1">
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
              disabled={addUserMutation.isPending}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {addUserMutation.isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
    </div>
  );
};

export default AddUserForm;
