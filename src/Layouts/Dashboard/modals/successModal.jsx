import { Check } from "lucide-react";

const SuccessModal = ({ successModal, setSuccessModal }) => {
  if (!successModal) return null;

  const { name, action } = successModal;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg flex flex-col items-center p-6 w-96 text-center">
        <Check className="w-15 h-15 text-green-600 border mb-5 rounded-full bg-green-100" />

        <div>
          <strong className="font-semibold">{name}</strong>
        </div>

        <p className="mb-6">
          has been successfully {action}.
        </p>

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

export default SuccessModal;