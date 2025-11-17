export default function DeleteConfirmModal({ member, onCancel, onConfirm }) {
  if (!member) return null;

  return (
    <div className="fixed font-[Poppins] inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-80 p-6 rounded-lg text-center">
        <h2 className="text-lg font-semibold">Delete Member</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <strong>{member.fullName}</strong>?
        </p>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => onConfirm(member.Id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
