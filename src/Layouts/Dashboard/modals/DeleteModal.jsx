import { TriangleAlert } from "lucide-react";

export default function DeleteModal({ item, onCancel, onConfirm }) {
  if (!item) return null;

  const { id, name ,action} = item;

  return (
    <div className="fixed font-[DM Sans] inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-90 p-5 rounded-lg text-center">
        <TriangleAlert className="w-10 h-10 text-red-500 mx-auto" />
        <p className="mt-4 text-gray-500">
          Are you sure you want to delete <br />
          <strong className="text-black">{name} {action}</strong>?
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
            onClick={() => onConfirm(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
