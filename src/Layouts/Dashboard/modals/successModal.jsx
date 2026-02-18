import { CircleCheckBig } from 'lucide-react';


/** Reusable Modal Component */
const SuccessModal = ({  message, onClose, buttonText, buttonColor }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
    <div className="bg-blue-900 rounded-2xl shadow-lg p-8 w-96 text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 text-blue-600 rounded-full p-4"> <CircleCheckBig /></div>
      </div>
      <h2 className="text-lg font-semibold text-white">{message}</h2>
      <button
        onClick={onClose}
        className={`mt-6 w-20 ${buttonColor} hover:opacity-90 text-white  font-medium py-2 rounded`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default SuccessModal;