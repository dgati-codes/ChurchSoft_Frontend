const UserEditModal = ({
  editingUser,
  formData,
  handleFormChange,
  handleUpdate,
  setEditingUser,
}) => {
  if (!editingUser) return null;

  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center z-60 items-center">
      <div className="bg-white p-8 rounded-lg w-180 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Edit User</h3>

        <div className="space-y-3">
          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              First Name :
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              className="w-130 border text-gr-500 ml-6 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              Last Name :
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold">User Name :</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              Phone Number :
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              Local Assembly :
            </label>
            <input
              type="text"
              name="localAssemblyName"
              value={formData.localAssemblyName}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              Status<span className="text-red-500">*</span>
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          <div className="flex align-center justify-between">
            <label className="font-semibold whitespace-nowrap">
              Role :
            </label>

            <input
              readOnly
              type="text"
              name="roleName"
              value={formData.roleName}
              className="w-130 border text-gr-600 border-gray-100 p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setEditingUser(null)}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;