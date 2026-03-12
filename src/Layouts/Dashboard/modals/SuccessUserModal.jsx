import { Check } from "lucide-react";

const SuccessUserModal = ({ successModal, setSuccessModal }) => {
  if (!successModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center w-96 text-center">
        <Check className="w-15 h-15 text-green-600 border mb-5 rounded-full bg-green-100 text-center" />

        <h2 className="text-xl font-semibold mb-4">
          <span
            className="font-semibold"
            // className={`font-semibold ${
            //   successModal.action === "deleted"
            //     ? "text-red-600"
            //     : successModal.action === "updated"
            //     ? "text-green-600"
            //     : "text-gray-600"
            // }`}
          >
            {successModal.firstName} {successModal.lastName}
          </span>{" "}
          {successModal.action === "updated"
            ? "Updated"
            : successModal.action === "deleted"
              ? "Deleted"
              : "Done"}
        </h2>

        <button
          onClick={() => setSuccessModal(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessUserModal;
