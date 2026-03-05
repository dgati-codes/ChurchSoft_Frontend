const DeleteUserModal = ({ deleteModal, setDeleteModal, confirmDelete }) => {
  if (!deleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center z-60 justify-center">
      <div className="bg-white p-6 rounded-lg w-96 text-center">

        <p className="mb-4 font-semibold">
          Delete
          <span className="text-red-500">
            {" "}
            {deleteModal.firstName} {deleteModal.lastName}
          </span>
          ?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModal(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => confirmDelete(deleteModal.id)}
            className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;