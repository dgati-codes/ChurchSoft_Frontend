import { XCircle } from "lucide-react";

const ErrorModal = ({
  errorModal,
  setErrorModal,
  buttonText = "Try Again",
}) => {
  if (!errorModal?.show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-[420px] text-center shadow-lg">

        <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Error
        </h2>

        <p className="text-gray-600 mb-6">
          {errorModal.message}
        </p>

        <button
          onClick={() =>
            setErrorModal({
              show: false,
              message: "",
            })
          }
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-500 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;