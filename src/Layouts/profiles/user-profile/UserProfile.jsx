import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function UserProfile() {
  const { user } = useAuth();
  return (
    <>
      <div className="min-h-screen bg-[#031B6B] py-6 px-6">
        <div className="flex ml-10 items-center ">
          <Link to="/dashboard" className="flex bg-gray-200 rounded-sm p-2 items-center gap-2 font-bold text-blue-600">
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <h1 className="text-xl font-bold text-center text-white mb-5">
          Personal Details
        </h1>

        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-md p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                value={user?.firstName || ""}
                type="text"
                readOnly
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                value={user?.lastName || ""}
                type="text"
                readOnly
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={user?.email || ""}
                type="email"
                readOnly
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Local Assembly <span className="text-red-500">*</span>
              </label>
              <input
                value={user?.localAssemblyName || ""}
                type="text"
                readOnly
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                value={user?.phoneNumber || ""}
                type="text"
                readOnly
                placeholder="Enter aadhar number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none"
              />
            </div>

            {/* Mobile Number */}
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

          {/* Button */}
          <div  className="flex justify-end-safe mt-6">
            <Link to="/edit-user-profile">
            <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
