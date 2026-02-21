import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function UserProfile() {
  const { user } = useAuth();
  return (
    <>
      <div className="h-100vh w-100vw  grid grid-rows-[20%_80%]">
        <div className="bg-[#031B6B] w-full h-full grid grid-cols-[20%_60%_20%]">
          <div className="flex pt-4 ml-10 items-center ">
            <Link
              to="/dashboard"
              className="flex rounded-sm p-2 items-center gap-2 font-bold text-white"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-center text-white mb-5">
            Personal Details
          </h1>
          </div>
          <div className="flex items-center p-8 justify-end">
            <Link to="/edit-user-profile">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
            <Pencil size={14} />
            Edit Profile
          </button>
          </Link>
        </div>
        </div>

        <div className="max-w-9xl mx-10 bg-white shadow-xl rounded-md p-7">
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
            <div>
              
            </div>
          </div>
  
        </div>
      </div>
    </>
  );
}

export default UserProfile;
